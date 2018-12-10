import React, {Component} from 'react';
import {
	Modal,
	Form,
	Select,
	Input,
	DatePicker,
} from 'antd';
import moment from 'moment';
import {getAllUsers} from '../../ajax';
import {LoadingState} from '../loading.react';
const {TextArea} = Input;
const INITIAL_STATE = {
	loading: true,
	author: '',
	date: '',
	families: [],
	members: [],
	text: '',
	users: [],
};

export class NewNote extends Component {
	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
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
		const {
			date,
			author,
			members,
			families,
			text,
		} = this.state;

		return (
			<Modal
				visible={visible}
				title="New Note"
				okText="Save Note"
				onCancel={() => onCancel(this._handleModalClose)}
				onOk={() => onSave(date, author, members, families, text, this._handleModalClose)}
			>
				{this._renderLoadingOrForm()}
			</Modal>
		);
	}

	_renderLoadingOrForm = () => {
		if (this.state.loading) {
			return <LoadingState />;
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

	_handleDateChange = (value) => {
		this.setState({
			date: value ? value.format('MM/DD/YYYY') : ''
		});
	}

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

	_handleModalClose = () => this.setState({
		author: '',
		date: '',
		families: [],
		members: [],
		text: '',
	});

	_handleTextChange = (event) => this.setState({
		text: event ? event.target.value : ''
	});

	_renderDatePicker = () => (
		<DatePicker
			format="MM/DD/YYYY"
			onChange={this._handleDateChange}
			value={this.state.date ? moment(this.state.date, 'MM/DD/YYYY') : undefined}
		/>
	);

	_renderAuthorSelect = () => {
		const options = this.state.users.map((user) => {
			const displayText = user.isMe ? 'Me' : user.name;
			return <Select.Option key={user._id} value={user.name}>{displayText}</Select.Option>
		});

		return (
			<Select allowClear={true} placeholder="Author" onChange={this._handleAuthorChange} value={this.state.author || undefined}>
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
				value={this.state[type]}
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
