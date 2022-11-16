import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import setLocalStorage from '../services/setLocalStorage';
import RedirectButton from '../components/RedirectButton';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score } = this.props;
    const newPlayer = {
      img: this.gravatarImg(),
      score,
      name,
    };
    setLocalStorage(newPlayer);
  }

  gravatarImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { assertions, score, history } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h1
          data-testid="feedback-total-question"
        >
          {assertions}
        </h1>
        <h1
          data-testid="feedback-total-score"
        >
          {score}
        </h1>
        <h1
          data-testid="feedback-text"
        >
          {(assertions < THREE) ? 'Could be better...' : 'Well Done!'}

        </h1>
        <RedirectButton
          dataTestId="btn-play-again"
          redirectPage="/"
          text="Play Again"
          history={ history }
        />
        <RedirectButton
          dataTestId="btn-ranking"
          redirectPage="/ranking"
          text="Ranking"
          history={ history }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.any,
}.isRequired;

const mapStateToProps = (store) => ({
  gravatarEmail: store.player.gravatarEmail,
  name: store.player.name,
  score: store.player.score,
  assertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
