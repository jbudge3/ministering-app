import React, {Component} from 'react';
import moment from 'moment';
import {orderBy} from 'lodash';
import {Card} from 'antd';
import {DeleteNote} from '../delete-note.react';

export class NoteCards extends Component {
	state = {
		deletedNotes: []
	};

	render() {
		const {
			type,
			id,
			order,
			notes
		} = this.props;
		const {deletedNotes} = this.state;
		const cards = [];
		const orderedNotes = orderBy(notes, ['date'], [order]);

		orderedNotes.forEach((note) => {
			if ((note[type].indexOf(id) !== -1) && (deletedNotes.indexOf(note._id) === -1)) {
				const cardTitle = `${moment(note.date).format('MM/DD/YYYY')} - ${note.author}`;
				cards.push(
					<Card
						key={note._id}
						title={cardTitle}
						className="Notes__card"
						extra={<DeleteNote onDeleteClick={() => this._handleDeleteNoteClick(note._id)}/>}
					>
						<p>{note.text}</p>
					</Card>
				);
			}
		});

		return cards;
	}

	_handleDeleteNoteClick = (id) => {
		const deletedNotes = this.state.deletedNotes.slice();
		deletedNotes.push(id);
		this.setState({deletedNotes});
	}

}
