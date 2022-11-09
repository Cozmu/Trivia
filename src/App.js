import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route exact path="/config" component={ Config } />
      </Switch>
    );
  }
}

export default App;
