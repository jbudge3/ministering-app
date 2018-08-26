import {isLoggedIn} from '../utils';

export function deleteNote(req, res, Notes) {
	if (isLoggedIn(req)) {
		const {noteId} = req.params;
		if (noteId) {
			Notes.deleteOne({_id: noteId}, (error) => {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			})
		} else {
			return res.json({succes: false, error: 'No note id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in to delete note'});
	}

}
