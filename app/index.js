import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { Switch, HashRouter, Route } from 'react-router-dom';
import BodyTripInfoPopOverComponent from './components/body-trip-info-popover';
import BodyAttachmentPopOverComponent from './components/body-attachment-popover';
import './scss/app.scss';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/attachPopOver" component={BodyAttachmentPopOverComponent} />
      {/* <Route path="/tripPopOver" component={BodyTripInfoPopOverComponent} />	 */}
    </Switch>
  </HashRouter>,
  document.getElementById('app')
);
