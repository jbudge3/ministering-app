import React, {Component, Fragment} from 'react';
import {
	Button,
	Select,
	Form,
	Tooltip,
} from 'antd';
import {DeleteItem} from '../delete-item.react';

export class MemberSettings extends Component {
	state = {
		memberId: null
	}

	render() {
		return (
			<Form>
				<Form.Item>
					<Button type="primary" icon="user-add">Add Quorum Member</Button>
				</Form.Item>

				<Form.Item>
					{this._renderMemberSelect()}
					{this.state.memberId && (
						<DeleteItem
							itemType="Quorum Member"
							buttonType="danger"
							icon="user-delete"
							onConfirm={this._handleConfirmDelete}
						/>
					)}
				</Form.Item>
			</Form>
		);
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	};

	_handleMemberSelectChange = (value) => this.setState({
		memberId: value ? value : null
	});

	_handleConfirmDelete = () => {
		console.log(this.state.memberId);
	}

	_renderMemberSelect = () => {
		const options = this.props.members.map(option => <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>);

		return (
			<Select
				showSearch
				placeholder="Current Quorum Members"
				optionFilterProp="children"
				filterOption={this._filterSelect}
				style={{width: 250, marginRight: 20}}
				onChange={this._handleMemberSelectChange}
			>
				{options}
			</Select>
		);
	};
}
