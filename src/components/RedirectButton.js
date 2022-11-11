import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class RedirectButton extends React.Component {
  render() {
    const { dataTestId, redirectPage, text, history } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestId }
        onClick={ () => {
          console.log(redirectPage);
          history.push(`${redirectPage}`);
        } }
      >
        {text}
      </button>

    );
  }
}

RedirectButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  redirectPage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default connect()(RedirectButton);
