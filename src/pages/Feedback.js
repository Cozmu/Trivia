import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <Header />
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (store) => ({
  gravatarEmail: store.player.gravatarEmail,
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
