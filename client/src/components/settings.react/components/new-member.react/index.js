import React, {Component} from 'react';
import {
	Modal,
	Form,
	Input,
	Tooltip
} from 'antd';

export class NewMember extends Component {
	state = {
		name: ''
	}

	render() {
		const {
			visible,
			onAdd,
			onCancel
		} = this.props;

		return (
			<Modal
				title="Add New Quorum Member"
				okText="Add"
				visible={visible}
				onOk={() => onAdd(this.state.name)}
				onCancel={onCancel}
			>
				<Form>
					<Form.Item>
						<Tooltip
							trigger={['focus']}
							title={`First and Last Name: "Jake Budge"`}
						>
							<Input
								placeholder="Quorum Member Name"
								onChange={this._handleNameInputChange}
								value={this.state.name}
							/>
						</Tooltip>
					</Form.Item>
				</Form>

			</Modal>
		)
	}

	_handleNameInputChange = (event) => this.setState({
		name: event ? event.target.value : ''
	});
}
