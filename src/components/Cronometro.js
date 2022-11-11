import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { timesUp } from '../redux/actions/index';

class Cronometro extends React.Component {
  state = {
    contador: 30,
  };

  componentDidMount() {
    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      this.counter();
      console.log('uma vez');
    }, FIVE_SECONDS);
  }

  counter = () => {
    const ONE_SECOND = 1000;
    const tempo = setInterval(() => {
      this.setState((prev) => ({
        contador: prev.contador - 1,
      }), () => {
        const { contador } = this.state;
        const { dispatch } = this.props;
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

Cronometro.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Cronometro);
