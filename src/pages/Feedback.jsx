import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  getAssertions = () => {
    const { assertions } = this.props;
    const couldBeBetter = 'Could be better...';
    const wellDone = 'Well Done!';
    const assertionsMin = 3;
    if (assertions < assertionsMin) {
      return couldBeBetter;
    }
    return wellDone;
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h3 data-testid="feedback-text">
          { this.getAssertions() }
        </h3>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({ assertions, score });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: string,
  score: string,
}.isRequired;
