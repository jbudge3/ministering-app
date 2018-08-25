import React, {Component, Fragment} from 'react';
import {
	Tooltip,
	Button,
} from 'antd';
import {NewNote} from '../new-note.react';

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

	_handleOkClick = () => {
		console.log('form submitted');
	};

}
