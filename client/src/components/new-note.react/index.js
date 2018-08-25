import React, {Component} from 'react';
import {
	Modal,
	Form,
	Select,
	Button,
	Input,
	DatePicker,
} from 'antd';
import moment from 'moment';
import {getAllUsers} from '../../ajax';
const {TextArea} = Input;

export class NewNote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			author: '',
			date: '',
			families: [],
			members: [],
			text: '',
			users: [],
		}
	}

	componentDidMount() {
		getAllUsers()
			.then((response) => {
				this.setState({
					loading: false,
					users: response
				});
			}, () => {
				window.location('/login');
			});
	}

	render() {
		const {
			visible,
			onCancel,
			onSave
		} = this.props;

		return (
			<Modal
				visible={visible}
				title="New Note"
				okText="Save Note"
				onCancel={onCancel}
				onOk={onSave}
			>
				{this._renderLoadingOrForm()}
			</Modal>
		);
	}

	_renderLoadingOrForm = () => {
		if (this.state.loading) {
			return <h1>Loading</h1>;
		} else {
			return (
				<Form layout="vertical">
					<Form.Item>
						{this._renderDatePicker()}
					</Form.Item>
					<Form.Item>
						{this._renderAuthorSelect()}
					</Form.Item>
					<Form.Item>
						{this._renderMemberFamilySelect('members', this.props.members)}
					</Form.Item>
					<Form.Item>
						{this._renderMemberFamilySelect('families', this.props.families)}
					</Form.Item>
					<Form.Item>
						{this._renderTextArea()}
					</Form.Item>
				</Form>
			)
		}
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	};

	_handleDateChange = (value) => this.setState({
		date: value ? moment(value).format('MM/DD/YYYY') : ''
	})

	_handleAuthorChange = (value) => this.setState({
		author: value ? value : ''
	});

	_handleMemberFamilyChange = (value, type) => {
		if (type === 'members') {
			this.setState({members: value});
		} else if (type === 'families') {
			this.setState({families: value});
		}
	};

	_handleTextChange = (event) => this.setState({
		text: event ? event.target.value : ''
	});

	_renderDatePicker = () => (
		<DatePicker
			format="MM/DD/YYYY"
			onChange={this._handleDateChange}
		/>
	);

	_renderAuthorSelect = () => {
		const options = this.state.users.map((user) => {
			const displayText = user.isMe ? 'Me' : user.name;
			return <Select.Option key={user._id} value={user.name}>{displayText}</Select.Option>
		});

		return (
			<Select placeholder="Author" onChange={this._handleAuthorChange}>
				{options}
			</Select>
		)
	}

	_renderMemberFamilySelect = (type, entities) => {
		const options = entities.map((entity) => {
			const displayText = type === 'families' ? `${entity.name}, ${entity.head}` : entity.name;
			return <Select.Option key={entity._id} value={entity._id}>{displayText}</Select.Option>;
		});

		return (
			<Select
				placeholder={type === 'families' ? 'Families Discussed' : 'Quorum Member(s)'}
				mode="multiple"
				optionFilterProp="children"
				filterOption={this._filterSelect}
				onChange={(value) => this._handleMemberFamilyChange(value, type)}
			>
				{options}
			</Select>
		);
	}

	_renderTextArea = () => (
		<TextArea
			placeholder="Notes from your meeting..."
			autosize={{minRows: 3, maxRows: 10}}
			value={this.state.text}
			onChange={this._handleTextChange}
		/>
	)
}
