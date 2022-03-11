import React, { Component } from 'react';
import PropType from 'prop-types';
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
    this.setState({ questions: triviaQuestions.results });
  }

  nextQuestion = () => {
    const { questionsIndex } = this.state;
    const limitQuestions = 3;
    if (questionsIndex <= limitQuestions) {
      this.setState({ questionsIndex: questionsIndex + 1 });
      console.log(questionsIndex);
    }
  }

  render() {
    const { questions, questionsIndex: i } = this.state;
    const question = questions[i];
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
                { question.incorrect_answers.map((item, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                  >
                    { item }
                  </button>))}
                {
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    { question.correct_answer }
                  </button>
                }
              </>
            )
          }
        </div>
        <br />
        <div>
          <button type="button" onClick={ this.nextQuestion }>Próxima</button>
        </div>
      </div>
    );
  }
}

export default connect()(Game);

Game.propType = {
  questions: PropType.object.isRequired,
};
