import React, {Component} from 'react';
import {
	Button,
	Select,
	Form,
	message,
} from 'antd';
import {DeleteItem} from '../delete-item.react';
import {NewMember} from '../new-member.react';
import {addNewMember, deleteMember} from '../../../../ajax';

export class MemberSettings extends Component {
	state = {
		memberId: null,
		addMemberVisible: false,
		members: this.props.members,
		deletedMembers: [],
	}

	render() {
		return (
			<Form>
				<Form.Item>
					<Button onClick={this._handleAddButtonClick} type="primary" icon="user-add">Add Quorum Member</Button>
					<NewMember
						visible={this.state.addMemberVisible}
						onAdd={this._handleAddNewMember}
						onCancel={this._handleAddMemberCancel}
					/>
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
		const id = this.state.memberId;
		deleteMember(id)
			.then((response) => {
				message.success('Quorum Member deleted successfully');
				const deletedMembers = this.state.deletedMembers.slice();
				deletedMembers.push(id);
				this.setState({
					memberId: null,
					deletedMembers
				});
			})
			.catch((error) => {
				message.error('Failed to delete quorum member');
				console.log(error);
			})
	};

	_handleAddNewMember = (name) => {
		addNewMember(name)
			.then((response) => {
				message.success('New Quorum Member added!');
				const members = this.state.members.slice();
				members.push(response);
				this.setState({
					addMemberVisible: false,
					members,
				});
			})
			.catch((error) => {
				message.error('Adding new Quorum Member failed. Please try again.');
				console.log(error);
			});
	};

	_handleAddButtonClick = () => this.setState({
		addMemberVisible: true
	});

	_handleAddMemberCancel = () => this.setState({
		addMemberVisible: false
	});

	_renderMemberSelect = () => {
		const options = [];
		this.state.members.forEach(option => {
			if (this.state.deletedMembers.indexOf(option._id) === -1) {
				options.push(<Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>)
			}
		});

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
