import React, {Component} from 'react';
import {
	Modal,
	Form,
	Input,
	Tooltip,
	Checkbox,
} from 'antd';

export class NewUser extends Component {
	state = {
		name: '',
		username: '',
		password: '',
		passwordConf: '',
		isAdmin: false
	};

	render() {
		const {
			visible,
			onAdd,
			onCancel
		} = this.props;
		const {
			name,
			username,
			password,
			passwordConf,
			isAdmin
		} = this.state;

		return (
			<Modal
				title="Add New User"
				okText="Add"
				visible={visible}
				onOk={() => onAdd(name, username, password, passwordConf, isAdmin)}
				onCancel={onCancel}
			>
				<Form>
					<Form.Item>
						<Tooltip
							trigger={['focus']}
							title={`First and Last Name: "Jake Budge"`}
						>
							<Input
								placeholder="Name"
								onChange={this._handleNameInputChange}
								value={this.state.name}
							/>
						</Tooltip>
					</Form.Item>

					<Form.Item>
						<Input
							placeholder="Username"
							onChange={this._handleUserNameInputChange}
							value={this.state.username}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							type="password"
							placeholder="Password"
							onChange={this._handlePasswordInputChange}
							value={this.state.password}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							type="password"
							placeholder="Confirm Password"
							onChange={this._handlePasswordConfInputChange}
							value={this.state.passwordConf}
						/>
					</Form.Item>

					<Form.Item>
						<Checkbox onChange={this._handleCheckboxChange}>
							This user will be an Administrator (not recommended)
						</Checkbox>
					</Form.Item>
				</Form>

			</Modal>
		)
	}

	_handleNameInputChange = (event) => this.setState({
		name: event ? event.target.value : ''
	});

	_handleUserNameInputChange = (event) => this.setState({
		username: event ? event.target.value : ''
	});

	_handlePasswordInputChange = (event) => this.setState({
		password: event ? event.target.value : ''
	});

	_handlePasswordConfInputChange = (event) => this.setState({
		passwordConf: event ? event.target.value : ''
	});

	_handleCheckboxChange = (event) => this.setState({
		isAdmin: event ? event.target.checked : false
	});
}
