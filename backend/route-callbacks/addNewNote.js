import {isLoggedIn} from '../utils';

export function addNewNote(req, res, Notes) {
	if (isLoggedIn(req)) {
		const note = new Notes();
		const {
			date,
			text,
			author,
			members,
			families,
		} = req.body;
		if (!members.length || !families.length) {
			return res.json({success: false, error: 'You must include at least one member and/or family'});
		} else if (date && text && author && members.length && families.length) {
			note.date = date;
			note.text = text;
			note.author = author;
			note.members = members;
			note.families = families;
			note.save((error) => {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: note});
				}
			})
		}
	} else {
		return res.json({success: false, error: 'You must be logged in to add a new note'});
	}
}
