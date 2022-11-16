import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetScore, saveNameAndEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    disabled: false,
  };

  handleInput = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    }, () => {
      const { email, name } = this.state;
      this.setState({
        disabled: (email.length > 0 && name.length > 0),
      });
    });
  };

  fetchToken = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => {
        // const x = {
        //   ranking: [],
        //   token: data.token,
        // };
        const { email, name } = this.state;
        const { dispatch, history } = this.props;
        localStorage.setItem('token', data.token);
        history.push('/game');
        dispatch(saveNameAndEmail(name, email));
        dispatch(resetScore());
      });
  };

  render() {
    const { email, name, disabled } = this.state;
    return (
      <main>
        <label htmlFor="email">
          Email
          <input
            placeholder="Qual seu email do gravatar?"
            data-testid="input-gravatar-email"
            id="email"
            type="email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            placeholder="Qual é seu nome?"
            data-testid="input-player-name"
            id="name"
            type="text"
            value={ name }
            onChange={ this.handleInput }
          />
        </label>
        <button
          disabled={ !disabled }
          data-testid="btn-play"
          type="button"
          onClick={ this.fetchToken }

        >
          Play

        </button>
        <br />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => {
            const { history } = this.props;
            history.push('/config');
          } }
        >
          Configurações
        </button>
      </main>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = (store) => ({
//   gravatarEmail: store.player.gravatarEmail,
//   name: store.player.name,
// });

export default connect()(Login);
