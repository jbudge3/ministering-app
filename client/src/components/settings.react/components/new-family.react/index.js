import React, {Component} from 'react';
import {
	Modal,
	Form,
	Input,
	Tooltip
} from 'antd';

export class NewFamily extends Component {
	state = {
		lastName: '',
		householdHeads: '',
	};

	render() {
		const {
			visible,
			onAdd,
			onCancel
		} = this.props;

		return (
			<Modal
				title="Add New Family"
				okText="Add"
				visible={visible}
				onOk={() => onAdd(this.state.lastName, this.state.householdHeads, this._handleModalClose)}
				onCancel={() => onCancel(this._handleModalClose)}
			>
				<Form>
					<Form.Item>
						<Tooltip
							trigger={['focus']}
							title={`Last Name: "Vincent"`}
						>
							<Input
								placeholder="Family Last Name"
								onChange={this._handleLastNameInputChange}
								value={this.state.lastName}
							/>
						</Tooltip>
					</Form.Item>
					<Form.Item>
						<Tooltip
							trigger={['focus']}
							title={`Name and Name: "Steve and Allie"`}
						>
							<Input
								placeholder="Head(s) of Household"
								onChange={this._handleHouseholdHeadsInputChange}
								value={this.state.householdHeads}
							/>
						</Tooltip>
					</Form.Item>
				</Form>

			</Modal>
		)
	}

	_handleModalClose = () => this.setState({
		lastName: '',
		householdHeads: '',
	});

	_handleLastNameInputChange = (event) => this.setState({
		lastName: event ? event.target.value : ''
	});

	_handleHouseholdHeadsInputChange = (event) => this.setState({
		householdHeads: event ? event.target.value : ''
	});
}
