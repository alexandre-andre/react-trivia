import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import FirstPage from './components/FirstPage';
import Login from './components/Login';
import Game from './components/Game';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={ FirstPage } /> */}
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    </BrowserRouter>
  );
}
