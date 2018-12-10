import React, {Component} from 'react';
import {
	Button,
	Select,
	Form,
	message,
} from 'antd';
import {DeleteItem} from '../delete-item.react';
import {NewUser} from '../new-user.react';
import {addNewUser, deleteUser} from '../../../../ajax';

export class UserSettings extends Component {
	state = {
		userId: null,
		addUserVisible: false,
		users: this.props.users,
		deletedUsers: [],
	}

	render() {
		return (
			<Form>
				<Form.Item>
					<Button onClick={this._handleAddButtonClick} type="primary" icon="user-add">Add User</Button>
					<NewUser
						visible={this.state.addUserVisible}
						onAdd={this._handleAddNewUser}
						onCancel={this._handleAddUserCancel}
					/>
				</Form.Item>

				<Form.Item>
					{this._renderUserSelect()}
					{this.state.userId && (
						<DeleteItem
							itemType="User"
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

	_handleUserSelectChange = (value) => this.setState({
		userId: value ? value : null
	});

	_handleConfirmDelete = () => {
		const id = this.state.userId;
		deleteUser(id)
			.then((response) => {
				message.success('User deleted successfully');
				const deletedUsers = this.state.deletedUsers.slice();
				deletedUsers.push(id);
				this.setState({
					memberId: null,
					deletedUsers
				});
			})
			.catch((error) => {
				message.error('Failed to delete user');
				console.log(error);
			})
	};

	_handleAddNewUser = (name, username, password, passwordConf, isAdmin = false, onSuccess) => {
		if (password !== passwordConf) {
			message.error('Passwords do not match');
		} else if (name && username && password && passwordConf) {
			addNewUser(name, username, password, passwordConf, isAdmin)
				.then((response) => {
					if (typeof onSuccess === 'function') {
						onSuccess();
					}
					message.success('New user added!');
					const users = this.state.users.slice();
					users.push(response);
					this.setState({
						addUserVisible: false,
						users,
					});
				})
				.catch((error) => {
					message.error('Adding new user failed. Please try again.');
					console.log(error);
				});
		} else {
			message.error('All fields are required to add a new user');
		}
	};

	_handleAddButtonClick = () => this.setState({
		addUserVisible: true
	});

	_handleAddUserCancel = (onCancel) => {
		if (typeof onCancel === 'function') {
			onCancel();
		}
		this.setState({
			addUserVisible: false
		});
	}

	_renderUserSelect = () => {
		const options = [];
		this.state.users.forEach(option => {
			if (this.state.deletedUsers.indexOf(option._id) === -1) {
				options.push(<Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>)
			}
		});

		return (
			<Select
				showSearch
				placeholder="Current Users"
				optionFilterProp="children"
				filterOption={this._filterSelect}
				style={{width: 250, marginRight: 20}}
				onChange={this._handleUserSelectChange}
			>
				{options}
			</Select>
		);
	};
}
