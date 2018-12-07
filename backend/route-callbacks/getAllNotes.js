var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(req, res, Notes) {
	if (isLoggedIn(req)) {
		Notes.find(function(error, notes) {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: notes});
			}
		});
	} else {
		return res.json({success: false, error: 'You must be logged in to view notes'});
	}
}
