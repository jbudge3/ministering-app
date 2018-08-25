import React, {Component, Fragment} from 'react';
import {
	Tooltip,
	Button,
	message
} from 'antd';
import {NewNote} from '../new-note.react';
import {addNewNote} from '../../ajax';

export class ComposeNew extends Component {
	state = {
		visible: false
	};

	render() {
		const {members, families} = this.props;

		return (
			<Fragment>
				<Tooltip placement="rightTop" title="Compose new note" mouseEnterDelay={1}>
					<Button
						type="primary"
						icon="form"
						onClick={this._handleComposeClick}
					/>
				</Tooltip>
				<NewNote
					visible={this.state.visible}
					onCancel={this._handleCancelClick}
					onSave={this._handleOkClick}
					members={members}
					families={families}
				/>
			</Fragment>
		);
	}

	_handleComposeClick = () => this.setState({
		visible: true
	});

	_handleCancelClick = () => this.setState({
		visible: false
	});

	_handleOkClick = (date, author, members, families, text, callback) => {
		addNewNote(date, author, members, families, text)
			.then((data) => {
				this.props.onNewNote(data);
				this.setState({
					visible: false
				});
				callback();
				message.success('Your new note saved successfully');

			})
			.catch((error) => {
				message.error('There was a problem saving your note. Please try again.');
				console.log(error);
			});
	};

}
