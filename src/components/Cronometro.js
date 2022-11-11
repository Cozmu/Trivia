import PropTypes from 'prop-types';
import React from 'react';

class Cronometro extends React.Component {
  componentDidMount() {
    const { counter } = this.props;
    counter();
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
