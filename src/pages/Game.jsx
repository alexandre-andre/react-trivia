import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getTriviaQuestion from '../service/getTriviaQuestions';
import { actionCreators } from '../redux/action';

class Game extends Component {
  state = {
    questions: '',
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

  // getQuestions = () => {

  // }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <h1>Pagina Game</h1>
        <div>
          <h4 data-testid="question-category">{ questions.category }</h4>
          <h4 data-testid="question-text">{ questions.question }</h4>
        </div>
        <div>
          {/* {
            results.map()
          } */}
        </div>
      </div>
    );
  }
}

export default connect()(Game);

Game.propType = {
  questions: PropType.object.isRequired,
};
