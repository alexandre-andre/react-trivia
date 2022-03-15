import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h3 data-testid="feedback-text">
          { this.getAssertions() }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions } }) => ({ assertions });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: string,
}.isRequired;
