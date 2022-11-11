import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { timesUp, hitTime } from '../redux/actions/index';

class Cronometro extends React.Component {
  state = {
    contador: 30,
  };

  componentDidMount() {
    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      this.counter();
    }, FIVE_SECONDS);
  }

  counter = () => {
    const ONE_SECOND = 1000;
    const tempo = setInterval(() => {
      this.setState((prev) => ({
        contador: prev.contador - 1,
      }), () => {
        const { contador } = this.state;
        const { dispatch, correct } = this.props;
        if (correct) {
          clearInterval(tempo);
          dispatch(hitTime(contador));
        }
        if (contador === 0) {
          clearInterval(tempo);
          dispatch(timesUp());
        }
      });
    }, ONE_SECOND);
  };

  render() {
    const { contador } = this.state;
    return (
      <div>
        <h3>
          {contador}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correct: state.player.correct,
});

Cronometro.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Cronometro);
