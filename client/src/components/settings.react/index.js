import React, {Component} from 'react';
import {
	Tabs,
	Button,
} from 'antd';
import {LoadingState} from '../loading.react';
import {UserSettings} from './components/user-settings.react';
import {MemberSettings} from './components/member-settings.react';
import {FamilySettings} from './components/family-settings.react';
import {
	getAllUsers,
	getAllMembers,
	getAllFamilies,
} from '../../ajax';
import './settings.css';

export class Settings extends Component {
	constructor() {
		super();
		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		Promise.all([getAllUsers(), getAllMembers(), getAllFamilies()])
			.then((response) => {
				this.setState({
					users: response[0],
					members: response[1],
					families: response[2],
					loading: false,
				});
			}, () => {
				window.location = '/home';
			});
	}

	render() {
		if (this.state.loading) {
			return <LoadingState />;
		} else {
			return (
				<div className="Settings">
					<Tabs tabBarExtraContent={this._renderBackToNotes()}>
						<Tabs.TabPane tab="Users" key={1}>
							<UserSettings users={this.state.users} />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Quorum Members" key={2}>
							<MemberSettings members={this.state.members} />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Families" key={3}>
							<FamilySettings families={this.state.families} />
						</Tabs.TabPane>
					</Tabs>
				</div>

			);
		}
	}

	_renderBackToNotes = () => (
		<Button
			type="secondary"
			onClick={this._goBackToNotes}
		>
			Back to Notes
		</Button>
	);

	_goBackToNotes = () => window.location = '/home';
}
