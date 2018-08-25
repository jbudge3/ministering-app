import React, {Component} from 'react';
import moment from 'moment';
import {orderBy} from 'lodash';
import {
	Tooltip,
	Button,
	Radio,
	Card,
	Select,
	message
} from 'antd';
import {
	getAllMembers,
	getAllFamilies,
	getAllNotes,
} from '../../ajax';
import './notes.css';

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
			selectedId: null,
			order: 'desc'
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
			selectedId,
			notes,
		} = this.state;

		if (pending) {
			return <h1>Loading...</h1>;
		} else {
			return (
				<div className="Notes">
					<div className="Notes__options">
						{this._renderTypeSelect()}
						{type && this._renderMemberFamilySelect(type)}
						{!type && this._renderDisabledSelect()}
						<Tooltip placement="rightTop" title="Compose new note" mouseEnterDelay={1}>
							<Button type="primary" icon="form" />
						</Tooltip>
					</div>

					{type && selectedId && (
						<div className="Notes__cards">
							<Radio.Group onChange={this._handleOrderByChange} value={this.state.order}>
								<Radio value="desc">Newest First</Radio>
								<Radio value="asc">Oldest First</Radio>
							</Radio.Group>
							{this._renderNoteCards(type, selectedId, notes)}
						</div>
					)}
				</div>

			);
		}
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	};

	_handleTypeChange = (value) => this.setState({
		type: value ? value : '',
		selectedId: null
	});

	_handleMemberFamilyChange = (value) => this.setState({
		selectedId: value ? value : null
	});

	_handleOrderByChange = (event) => this.setState({
		order: event ? event.target.value : 'desc'
	});

	_renderTypeSelect = () => (
		<Select
			placeholder="Select a Group"
			optionFilterProp="children"
			style={{width: 250, marginRight: 20}}
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
				style={{width: 250, marginRight: 20}}
				onChange={this._handleMemberFamilyChange}
			>
				{options}
			</Select>
		);
	};

	_renderDisabledSelect = () => (
		<Select defaultValue="message" style={{width: 250, marginRight: 20}} disabled>
			<Select.Option value="message">Quorum Member or Family</Select.Option>
		</Select>
	);

	_renderNoteCards = (type, id, notes) => {
		const orderedNotes = orderBy(notes, ['date'], [this.state.order]);
		const cards = orderedNotes.map((note) => {
			if (note[type].indexOf(id) !== -1) {
				const cardTitle = `${moment(note.date).format('MM/DD/YYYY')} - ${note.author}`;
				return (
					<Card
						key={note._id}
						title={cardTitle}
						className="Notes__card"
					>
						<p>{note.text}</p>
					</Card>
				);
			} else {
				return null;
			}
		});
		return cards;
	}
}
