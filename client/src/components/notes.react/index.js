import React, {Component} from 'react';
import {
	Button,
	Icon,
	Radio,
	Select,
	message
} from 'antd';
import {ComposeNew} from '../compose-new.react';
import {LoadingState} from '../loading.react';
import {NoteCards} from '../note-cards.react';
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
			order,
		} = this.state;

		if (pending) {
			return <LoadingState />;
		} else {
			return (
				<div className="Notes">
					<div className="Notes__options">
						{this._renderTypeSelect()}
						{type && this._renderMemberFamilySelect(type)}
						{!type && this._renderDisabledSelect()}
						<ComposeNew
							members={this.state.members}
							families={this.state.families}
							onNewNote={this._handleNewNoteAdd}
						/>
						<Button
							className="Notes__settingsLink"
							shape="circle"
							type="secondary"
							onClick={this._handleSettingsButtonClick}
						>
							<Icon type="setting" />
						</Button>
					</div>

					{type && selectedId && (
						<div className="Notes__cards">
							<Radio.Group onChange={this._handleOrderByChange} value={this.state.order}>
								<Radio value="desc">Newest First</Radio>
								<Radio value="asc">Oldest First</Radio>
							</Radio.Group>
							<NoteCards
								type={type}
								id={selectedId}
								notes={notes}
								order={order}
							/>
						</div>
					)}
				</div>

			);
		}
	}

	_filterSelect = (input, option) => {
		return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
	};

	_handleSettingsButtonClick = () => window.location = '/settings';

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

	_handleNewNoteAdd = (note) => {
		const newNotes = this.state.notes.slice();
		newNotes.push(note);
		this.setState({
			notes: newNotes
		});
	};

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
}
