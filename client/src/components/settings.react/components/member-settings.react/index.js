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
				{this._renderMemberSelect()}
			</Fragment>
		);
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	};

	_renderMemberSelect = (type) => {
		const options = this.props.members.map(option => <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>);

		return (
			<Select
				showSearch
				placeholder={'Current Quorum Members'}
				optionFilterProp="children"
				filterOption={this._filterSelect}
				style={{width: 250, marginRight: 20}}
			>
				{options}
			</Select>
		);
	};
}
