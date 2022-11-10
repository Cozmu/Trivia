// import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  gravatarImg = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    // const { profilePicture, playerName, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          // src={ () => {} }
          alt=""
        />
        <h3
          data-testid="header-player-name"
        >
          name

        </h3>
        <h3
          data-testid="header-score"
        >
          score

        </h3>
      </header>
    );
  }
}

// Header.propTypes = {
//   profilePicture: PropTypes.string.isRequired,
//   playerName: PropTypes.string.isRequired,
// };

export default Header;
