import PropTypes from 'prop-types';
import React from 'react';
import '../css/Cronometro.css';
import { CiTimer } from 'react-icons/ci';

class Cronometro extends React.Component {
  componentDidMount() {
    const { counter } = this.props;
    counter();
  }

  runningOutOfTime = (time) => {
    const TEN = 10;
    if (time <= TEN) {
      return 'cronometro runningOutOfTime';
    }
    return 'cronometro';
  };

  render() {
    const { contador } = this.props;
    // const x = contador !== 0 ? (
    //   <div className={ this.runningOutOfTime(contador) }>
    //     <CiTimer />
    //     <h3 className="tempo">
    //       Tempo:
    //     </h3>
    //     <h3>
    //       {contador}
    //       s
    //     </h3>
    //   </div>) : <h3>Tempo Esgotado</h3>;
    return (
      <div className={ this.runningOutOfTime(contador) }>
        <CiTimer />
        <h3 className="tempo">
          Tempo:
        </h3>
        <h3 data-testid="cronometro">
          {contador}
          s
        </h3>
      </div>
    );
  }
}

Cronometro.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default Cronometro;
