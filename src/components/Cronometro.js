import PropTypes from 'prop-types';
import React from 'react';

class Cronometro extends React.Component {
  componentDidMount() {
    const { counter } = this.props;
    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      counter();
    }, FIVE_SECONDS);
  }

  render() {
    const { contador } = this.props;
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

export default Cronometro;
