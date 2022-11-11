import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RedirectButton from './RedirectButton';

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
    const { name, score, history } = this.props;
    return (
      <header>
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
        <h3
          data-testid="header-score"
        >
          {score}
        </h3>
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
