import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import setLocalStorage from '../services/setLocalStorage';
import style from '../css/feedback.module.css';
import RedirectButton from '../components/RedirectButton';

class Feedback extends React.Component {
  state = {
    Image: '',
  };

  componentDidMount() {
    const { name, score } = this.props;
    const newPlayer = {
      img: this.gravatarImg(),
      score,
      name,
    };
    this.setState({
      Image: this.gravatarImg(),
    });
    setLocalStorage(newPlayer);
  }

  gravatarImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { assertions, score, history } = this.props;
    const { Image } = this.state;
    const THREE = 3;
    return (
      <div>
        <Header />
        <div className={ style.feedback }>
          <img className={ style.image } src={ Image } alt="Usuario" />
          <h1
            data-testid="feedback-text"
            className={ (assertions < THREE) ? style.Couldbebetter : style.WellDone }
          >
            {(assertions < THREE) ? 'Could be better...' : 'Well Done!'}

          </h1>
          <div className={ style.assertionsScore }>
            <h1
              data-testid="feedback-total-question"
            >
              {`Você acertou ${assertions} questões!`}
            </h1>
            <h1
              className={ style.pontos }
              data-testid="feedback-total-score"
            >
              {`Um total de ${score} pontos!`}
            </h1>
          </div>
        </div>
        <div className={ style.buttons }>
          <RedirectButton
            className={ style.playAgain }
            dataTestId="btn-play-again"
            redirectPage="/"
            text="Play Again"
            history={ history }
          />
          <RedirectButton
            className={ style.ranking }
            dataTestId="btn-ranking"
            redirectPage="/ranking"
            text="Ranking"
            history={ history }
          />
        </div>
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
