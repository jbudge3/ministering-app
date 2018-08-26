import React, {Component, Fragment} from 'react';
import {
	Button,
	Select,
} from 'antd';

export class MemberSettings extends Component {
	render() {
		return (
			<Fragment>
				<Button type="primary" icon="user-add">Add a New Quorum Member</Button>
			</Fragment>
		);
	}
}
