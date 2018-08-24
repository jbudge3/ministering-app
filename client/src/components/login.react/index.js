import React, {Component} from 'react';
import {
	Form,
	Icon,
	Input,
	Button,
	message,
} from 'antd';
import {login} from '../../ajax';
import './login.css';

export class Login extends Component {
	state = {
		username: '',
		password: '',
		loading: false,
	}
	render() {
		return (
			<div className="Login">
				<Form onSubmit={this._handleLoginSubmit}>
					<Form.Item>
						<Input
							prefix={<Icon type="user" />}
							placeholder="Username"
							value={this.state.username}
							onChange={this._handleUsernameChange}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							prefix={<Icon type="lock" />}
							placeholder="Password"
							type="password"
							value={this.state.password}
							onChange={this._handlePasswordChange}
						/>
					</Form.Item>

					<Form.Item>
						<Button block={true} type="primary" htmlType="submit" loading={this.state.loading}>
							Log In
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}

	_handleLoginSubmit = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const {username, password} = this.state;

		login(username, password)
			.then((response) => {
				if (response.success) {
					window.location = '/home';
				} else {
					this._handleLoginError();
					console.log(response.error);
				}
			})
			.catch((error) => {
				this._handleLoginError();
			});
	}

	_handleUsernameChange = (event) => this.setState({
		username: event ? event.target.value : ''
	});

	_handlePasswordChange = (event) => this.setState({
		password: event ? event.target.value : ''
	});

	_handleLoginError = () => {
		this.setState({loading: false});
		message.error('Attempt to login failed. Please try again');
	}
}
