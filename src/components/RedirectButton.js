import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class RedirectButton extends React.Component {
  render() {
    const { dataTestId, redirectPage, text, history, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        data-testid={ dataTestId }
        onClick={ () => {
          history.push(`${redirectPage}`);
        } }
      >
        {text}
      </button>
    );
  }
}

RedirectButton.propTypes = {
  className: PropTypes.any,
  dataTestId: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  redirectPage: PropTypes.any,
  text: PropTypes.any,
}.isRequired;

export default connect()(RedirectButton);
