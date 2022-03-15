import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, hash } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ `Foto de ${name}` }
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{name}</h4>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, score, hash } }) => ({
  name, score, hash,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: string,
  score: number,
  hash: string,
}.isRequired;
