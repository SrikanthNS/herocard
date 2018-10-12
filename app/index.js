import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';
import App from './components/app';
import './scss/app.scss';
import './scss/variables.scss';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" exact component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
);
