import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import {Notes} from '../notes.react';
import {Login} from '../login.react';
import {Settings} from '../settings.react';
import './ministering.css';

export class Ministering extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Route exact path="/" component={Notes} />
					<Route path="/home" component={Notes} />
					<Route path="/login" component={Login} />
					<Route path="/settings" component={Settings} />
				</div>
			</Router>
		);
	}
}
