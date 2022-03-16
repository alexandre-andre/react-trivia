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
    isVisible: false,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    let triviaQuestions = await getTriviaQuestion(token);
    const invalidToken = 3;

    // Verifica se o token é invalido, se for renova
    if (triviaQuestions.response_code === invalidToken) {
      await dispatch(actionCreators.requestAPI());
      const newToken = JSON.parse(localStorage.getItem('token'));
      triviaQuestions = await getTriviaQuestion(newToken);
    }
    if (triviaQuestions.length !== 0) {
      this.setState({ questions: triviaQuestions.results });
    }

    // Cria o array com as alternativas de todas as perguntas
    const responseObj = triviaQuestions.results;
    const answersArray = this.createArrayOfAnswers(responseObj);
    // Embaralha as alternativas
    answersArray.forEach((el) => this.shuffleArray(el));
    // Coloca as alternativas de todas as perguntas já embaralhadas no state
    this.setState({ answers: answersArray });

    // Atualiza o timer no estado
    const oneSecond = 1000;
    setInterval(this.decreaseTimer, oneSecond);

    // Atualiza o placar pegando as informações no localStorage
    const playerName = document.querySelector('h4').textContent;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const player = ranking.find((el) => el.name === playerName);
    if (player) { dispatch(actionCreators.updatePlayerScore([player.score])); }
  }

  createArrayOfAnswers = (responseObj) => {
    const answersArray = [];
    responseObj.forEach((el) => { // Pega as alternativas pra criar um array
      const answers = [];
      el.incorrect_answers.map((answer, index) => (
        answers.push({ answer, testId: `wrong-answer-${index}`, id: 'wrong' })
      ));
      answers.push({
        answer: el.correct_answer,
        testId: 'correct-answer',
        id: 'correct' });
      answersArray.push(answers);
    });
    return answersArray;
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

    this.setAnswersColors('', ''); // Remove as cores das alternativas
    this.setState({ isVisible: false });

    // Redireciona para a pagina de feedback na quinta pergunta
    const { history } = this.props;
    const indexToEnd = 4;
    if (questionsIndex === indexToEnd) {
      const playerName = document.querySelector('h4').textContent;
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const player = ranking.find((el) => el.name === playerName);

      this.verifyPlayerOnRanking(player);

      history.push('/feedback');
    }
  }

  setAnswersColors = (correctColor, wrongColor) => {
    const correct = document.querySelector('#correct');
    const wrong = document.querySelectorAll('#wrong');

    correct.style.border = correctColor;
    for (let i = 0; i < wrong.length; i += 1) {
      wrong[i].style.border = wrongColor;
    }
  }

  onAnswerClick = ({ target }) => {
    const playerName = document.querySelector('h4').textContent;

    this.setAnswersColors('3px solid rgb(6, 240, 15)', '3px solid rgb(255, 0, 0)');

    if (target.id === 'correct') {
      let ranking = JSON.parse(localStorage.getItem('ranking'));
      const player = ranking.find((el) => el.name === playerName);

      this.verifyPlayerOnRanking(player);

      // Pega o ranking novamente no localStorage caso seja atualizado na função verifyPlayerOnRanking()
      ranking = JSON.parse(localStorage.getItem('ranking'));
      // Atualiza os pontos
      ranking.map(this.refreshPoints);
      // Salva o ranking atualizado no localStorage
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    this.setState({ isVisible: true });
  }

  verifyPlayerOnRanking = (player) => {
    const playerImg = document.querySelector('img').src;
    const playerName = document.querySelector('h4').textContent;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (player === undefined) { // Se o jogador ainda não está no ranking cria ele lá
      const newPlayerPoints = 0;
      player = {
        name: playerName,
        score: newPlayerPoints,
        picture: playerImg,
        assertions: 0,
      };
      ranking.push(player);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  refreshPoints = (playerInfo) => { // Chamada no .map da linha 116 que roda ao clicar numa alternativa
    const { questions, questionsIndex: i, timer } = this.state;
    const { difficulty } = questions[i];
    const multiplier = { hard: 3, medium: 2, easy: 1 };
    const initialPoints = 10;
    const playerName = document.querySelector('h4').textContent;
    const { dispatch } = this.props;

    if (playerInfo.name === playerName) {
      playerInfo.score += initialPoints + (timer * multiplier[difficulty]);
      playerInfo.assertions += 1;

      dispatch(
        actionCreators.updatePlayerScore([playerInfo.score, playerInfo.assertions]),
      );
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
    const { questions, questionsIndex: i, answers,
      timer, isDisabled, isVisible } = this.state;
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
                        onClick={ this.onAnswerClick }
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
        {
          isVisible && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ player: { score } }) => ({
  score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  dispatch: func,
}.isRequired;
