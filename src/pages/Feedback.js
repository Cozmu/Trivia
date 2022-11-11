import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h1
          data-testid="feedback-text"
        >
          {(assertions < THREE) ? 'Could be better...' : 'Well Done!'}

        </h1>
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
  assertions: PropTypes.any,
}.isRequired;

const mapStateToProps = (store) => ({
  gravatarEmail: store.player.gravatarEmail,
  name: store.player.name,
  score: store.player.score,
  assertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
