import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getTriviaQuestion from '../service/getTriviaQuestions';
import { actionCreators } from '../redux/action';

class Game extends Component {
  state = {
    questions: [],
    questionsIndex: 0,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    let triviaQuestions = await getTriviaQuestion(token);
    const invalidToken = 3;
    if (triviaQuestions.response_code === invalidToken) {
      await dispatch(actionCreators.requestAPI());
      const newToken = JSON.parse(localStorage.getItem('token'));
      triviaQuestions = await getTriviaQuestion(newToken);
    }
    if (triviaQuestions.length !== 0) {
      this.setState({ questions: triviaQuestions.results });
    }
  }

  nextQuestion = () => {
    const { questionsIndex } = this.state;
    const limitQuestions = 3;
    if (questionsIndex <= limitQuestions) {
      this.setState({ questionsIndex: questionsIndex + 1 });
    }

    this.removeAnswerColor();
  }

  removeAnswerColor = () => {
    const correct = document.querySelector('#correct-answer');
    const wrong = document.querySelectorAll('#wrong-answer');
    correct.style.border = '';
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '';
    }
  }

  handleAnswerColor = () => {
    const correct = document.querySelector('#correct-answer');
    const wrong = document.querySelectorAll('#wrong-answer');

    correct.style.border = '3px solid rgb(6, 240, 15)';
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  render() {
    const { questions, questionsIndex: i } = this.state;
    const question = questions[i];
    let answers = [];

    // Função abaixo baseada em https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
      for (let k = array.length - 1; k > 0; k -= 1) {
        const j = Math.floor(Math.random() * (k + 1));
        [array[k], array[j]] = [array[j], array[k]];
      }
    }

    if (questions.length) {
      answers = question.incorrect_answers.map((answer, index) => (
        { answer, testId: `wrong-answer-${index}`, id: 'wrong-answer' }
      ));
      answers.push({
        answer: question.correct_answer,
        testId: 'correct-answer',
        id: 'correct-answer' });
      shuffleArray(answers);
    }

    return (
      <div>
        <Header />
        <h1>Pagina Game</h1>
        <div>
          {
            questions.length
            && (
              <>
                <h4 data-testid="question-category">{ question.category }</h4>
                <h4 data-testid="question-text">{ question.question }</h4>
                <div data-testid="answer-options">
                  {
                    answers.map((item, index) => (
                      <button
                        key={ index }
                        type="button"
                        id={ `${item.id}` }
                        data-testid={ `${item.testId}` }
                        onClick={ this.handleAnswerColor }
                      >
                        { item.answer }
                      </button>
                    ))
                  }
                </div>
              </>
            )
          }
        </div>
        <br />
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima

          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Game);

Game.propTypes = {
  dispatch: func,
}.isRequired;
