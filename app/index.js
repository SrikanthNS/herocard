import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';
import App from './components/app.js';
import './scss/app.scss';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" exact component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
);
