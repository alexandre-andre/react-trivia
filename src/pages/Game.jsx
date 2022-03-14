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
    answers: [],
    timer: 30,
    isDisabled: false,
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

    const responseObj = triviaQuestions.results;
    const answersArray = [];
    responseObj.forEach((el) => { // Pega as alternativas para embaralhar
      const answers = [];
      el.incorrect_answers.map((answer, index) => (
        answers.push({ answer, testId: `wrong-answer-${index}`, id: 'wrong-answer' })
      ));
      answers.push({
        answer: el.correct_answer,
        testId: 'correct-answer',
        id: 'correct-answer' });
      answersArray.push(answers);
    });

    answersArray.forEach((el) => this.shuffleArray(el));

    this.setState({ answers: answersArray });

    const oneSecond = 1000;
    setInterval(this.decreaseTimer, oneSecond);
  }

  nextQuestion = () => {
    const { questionsIndex } = this.state;
    const limitQuestions = 3;
    if (questionsIndex <= limitQuestions) {
      this.setState({
        questionsIndex: questionsIndex + 1,
        timer: 30,
        isDisabled: false,
      });
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

  // Função abaixo baseada em https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    for (let k = array.length - 1; k > 0; k -= 1) {
      const j = Math.floor(Math.random() * (k + 1));
      [array[k], array[j]] = [array[j], array[k]];
    }
  }

  decreaseTimer = () => {
    const { timer } = this.state;
    if (timer !== 0) this.setState({ timer: timer - 1 });

    if (timer === 0) this.setState({ timer: 0, isDisabled: true });
  }

  render() {
    const { questions, questionsIndex: i, answers, timer, isDisabled } = this.state;
    const question = questions[i];
    const answer = answers[i];

    return (
      <div>
        <Header />
        <h1>Pagina Game</h1>
        <div>
          {
            answers.length
            && (
              <>
                <h4 data-testid="question-category">{ question.category }</h4>
                <h4 data-testid="question-text">{ question.question }</h4>
                <div data-testid="answer-options">
                  {
                    answer.map((item, index) => (
                      <button
                        key={ index }
                        type="button"
                        id={ `${item.id}` }
                        data-testid={ `${item.testId}` }
                        disabled={ isDisabled }
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
        <p>
          Timer:
          {`${timer}`}
        </p>
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
