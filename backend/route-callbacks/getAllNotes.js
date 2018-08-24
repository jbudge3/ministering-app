import {isLoggedIn} from '../utils';

export function getAllNotes(req, res, Notes) {
	if (isLoggedIn(req)) {
		Notes.find((error, notes) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: notes});
			}
		})
	} else {
		return res.json({success: false, error: 'You must be logged in to view notes'});
	}
}
