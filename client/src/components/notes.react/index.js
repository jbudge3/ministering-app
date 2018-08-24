import React, {Component} from 'react';
import {
	getAllMembers,
	getAllFamilies,
	getAllNotes,
} from '../../ajax';

export class Notes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			members: null,
			families: null,
			notes: null,
			pending: true,
		}
	}

	componentDidMount() {
		Promise.all([getAllMembers(), getAllFamilies(), getAllNotes()])
			.then((response) => {
				this.setState({
					members: response[0],
					families: response[1],
					notes: response[2],
					pending: false,
				});
			});
	}
	render() {
		if (this.state.pending) {
			return <h1>Loading...</h1>;
		} else {
			return <h1>Loaded!</h1>
		}

	}
}
