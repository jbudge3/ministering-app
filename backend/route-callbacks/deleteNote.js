var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(req, res, Notes) {
	if (isLoggedIn(req)) {
		var noteId = req.params.noteId;

		if (noteId) {
			Notes.deleteOne({_id: noteId}, function(error) {
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
