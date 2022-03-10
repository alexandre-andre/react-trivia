import React, { Component } from 'react';
// import PropType from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>Pagina inicial do jogo</div>
    );
  }
}

export default connect()(Game);

Game.propType = {
};
