import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import FirstPage from './components/FirstPage';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

if (localStorage.ranking === undefined) {
  localStorage.ranking = '[]';
}

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={ FirstPage } /> */}
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </BrowserRouter>
  );
}
