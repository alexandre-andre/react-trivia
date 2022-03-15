import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h3 data-testid="feedback-text">Texto do feedback</h3>
      </div>
    );
  }
}

export default connect()(Feedback);
