import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

export default connect()(Ranking);
