import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import {Notes} from '../notes.react';
import {Login} from '../login.react';

export class Ministering extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Notes} />
					<Route path="/home" component={Notes} />
					<Route path="/login" component={Login} />
				</div>
			</Router>
		);
	}
}
