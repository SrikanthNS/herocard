import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { BodyAttachmentPopOverComponent, BodyTripInfoPopOverComponent } from './components/sectionComponent'
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
)