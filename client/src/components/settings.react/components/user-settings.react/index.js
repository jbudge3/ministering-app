import React, {Component, Fragment} from 'react';
import {
	Button,
	Select,
} from 'antd';

export class UserSettings extends Component {
	render() {
		return (
			<Fragment>
				<Button type="primary" icon="user-add">Add a New User</Button>
			</Fragment>
		);
	}
}
