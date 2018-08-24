import React, {Component} from 'react';
import {
	Select,
	message
} from 'antd';
import {
	getAllMembers,
	getAllFamilies,
	getAllNotes,
} from '../../ajax';

export class Notes extends Component {
	constructor(props) {
		super(props);
		message.success('Welcome!');

		this.state = {
			members: null,
			families: null,
			notes: null,
			pending: true,
			type: '',
			selectedId: null
		}
	}

	componentDidMount() {
		Promise.all([getAllMembers(), getAllFamilies(), getAllNotes()])
			.then((response) => {
				this.setState({
					members: response[0],
					families: response[1],
					notes: response[2],
					pending: false,
				});
			}, () => {
				window.location = '/login';
			});
	}

	render() {
		const {
			pending,
			type,
		} = this.state;

		if (pending) {
			return <h1>Loading...</h1>;
		} else {
			return (
				<div className="Notes">
					{this._renderTypeSelect()}
					{type && this._renderMemberFamilySelect(type)}
				</div>

			);
		}
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	}

	_handleTypeChange = (value) => this.setState({
		type: value ? value : ''
	});

	_renderTypeSelect = () => (
		<Select
			placeholder="See Quorum Members or Families"
			optionFilterProp="children"
			style={{width: 300}}
			onChange={this._handleTypeChange}
		>
			<Select.Option value="members">Quorum Member</Select.Option>
			<Select.Option value="families">Family</Select.Option>
		</Select>
	);

	_renderMemberFamilySelect = (type) => {
		const group = this.state[type];
		const options = group.map((option) => {
			const displayText = option.head ? `${option.name}, ${option.head}` : option.name;
			return <Select.Option key={option._id} value={option._id}>{displayText}</Select.Option>
		});

		return (
			<Select
				showSearch
				placeholder={type === 'members' ? 'Select a Quorum Member' : 'Select a Family'}
				optionFilterProp="children"
				filterOption={this._filterSelect}
				style={{width: 300}}
			>
				{options}
			</Select>
		);
	};
}
