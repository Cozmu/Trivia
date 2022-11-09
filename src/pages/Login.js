import React from 'react';

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
        <button disabled={ !disabled } data-testid="btn-play" type="button">Play</button>
      </main>
    );
  }
}

export default Login;
