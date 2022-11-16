import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import RedirectButton from './RedirectButton';
import '../css/Header.css';
import { AiFillStar } from 'react-icons/ai';
import logoTrivia from '../imgs/logoTrivia.png';

class Header extends React.Component {
  state = {
    img: '',
  };

  componentDidMount() {
    this.setState({
      img: this.gravatarImg(),
    });
  }

  gravatarImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { img } = this.state;
    const { name, score } = this.props;
    return (
      <header className="header-container">
        <img
          className="logoTrivia"
          src={ logoTrivia }
          alt="logoTrivia"
        />
        <section className="info-jogador-container">
          <img
            data-testid="header-profile-picture"
            src={ img }
            alt=""
          />
          <h3
            data-testid="header-player-name"
          >
            {name}

          </h3>
        </section>
        <section className="pontuacao-container">
          <AiFillStar className="start" />
          <h3
            className="score"
          >
            Pontos:
          </h3>
          <h3
            data-testid="header-score"
          >
            {score}
          </h3>
        </section>
        {/* <RedirectButton
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
        /> */}
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (store) => ({
  gravatarEmail: store.player.gravatarEmail,
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps)(Header);
