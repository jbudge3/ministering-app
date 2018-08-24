import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import {Notes} from '../notes.react';

export class Ministering extends Component {
	render() {
		return (
			<Router>
				<Route path="/notes" component={Notes} />
			</Router>
		);
	}
}
