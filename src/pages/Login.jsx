import React from 'react';
// import './Login.css';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { actionCreators } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => { // pah
    this.setState({ [name]: value }, this.playBtnValidated); // seta name-value dinamicamente e chama uma funcao
  }

  playBtnValidated = () => {
    const { email, name } = this.state;
    if (email && name) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit = async (e, email, name) => {
    const { dispatch, history } = this.props;
    const hash = md5(email).toString();
    const playerData = [email, name, hash];
    e.preventDefault();

    dispatch(actionCreators.sendPlayerData(playerData)); // dispara acao de enviar login do usuario
    await dispatch(actionCreators.requestAPI());
    // Cria a chave "ranking" no localStorage
    if (localStorage.ranking === undefined) {
      localStorage.ranking = '[]';
    }
    history.push('/game'); // apos o dispatch entra nn rota /game
  }

  render() {
    const { isDisabled, email, name } = this.state;
    return (
      <div className="containerLogin">
        <form className="formLogin">
          <input
            className="inputLogin"
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            className="inputLogin"
            name="name"
            type="name"
            data-testid="input-player-name"
            placeholder="nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            className="btnLogin"
            data-testid="btn-play"
            onClick={ (e) => this.handleSubmit(e, email, name) }
            type="button"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default connect()(Login);
Login.propTypes = {
  history: object,
}.isRequired;
