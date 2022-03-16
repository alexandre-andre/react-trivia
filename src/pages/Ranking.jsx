import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  state ={
    ranking: [],
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);

    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { ranking.map((el, i) => (
            <div key={ i }>
              <img src={ el.image } alt={ el.name } />
              <p data-testid={ `player-name-${i}` }>{el.name}</p>
              <p data-testid={ `player-score-${i}` }>{el.score}</p>
            </div>
          ))}
        </div>
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
