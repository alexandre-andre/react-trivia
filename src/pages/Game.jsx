import React, { Component } from 'react';
// import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Pagina Game</h1>
      </div>
    );
  }
}

export default connect()(Game);

Game.propType = {
};
