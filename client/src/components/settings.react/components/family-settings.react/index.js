import React, {Component, Fragment} from 'react';
import {
	Button,
	Select,
} from 'antd';

export class FamilySettings extends Component {
	render() {
		return (
			<Fragment>
				<Button type="primary" icon="usergroup-add">Add a New Family</Button>
			</Fragment>
		);
	}
}
