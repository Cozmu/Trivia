import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { profilePicture, playerName, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profilePicture }
          alt=""
        />
        <h3
          data-testid="header-player-name"
        >
          { playerName }

        </h3>
        <h3
          data-testid="header-score"
        >
          { score }

        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

mapStateToProps = () => ({
  profilePicture: '',
  playerName: '',
  score: 0,
});

export default connect(mapStateToProps)(Header);
