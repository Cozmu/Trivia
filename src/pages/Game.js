import PropTypes from 'prop-types';
import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <main>
        <h1>Jogo</h1>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Game;
