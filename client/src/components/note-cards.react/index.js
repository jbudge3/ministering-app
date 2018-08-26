import React from 'react';
import moment from 'moment';
import {orderBy} from 'lodash';
import {Card} from 'antd';


export function NoteCards(type, id, notes, order) {
	const orderedNotes = orderBy(notes, ['date'], [order]);
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
