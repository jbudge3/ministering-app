var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(req, res, Notes) {
	if (isLoggedIn(req)) {
		var note = new Notes();

		var	date = req.body.date;
		var	text = req.body.text;
		var	author = req.body.author;
		var	members = req.body.members;
		var	families = req.body.families;

		if (!members || !families || !members.length || !families.length) {
			return res.json({success: false, error: 'You must include at least one member and/or family'});
		} else if (date && text && author && members.length && families.length) {
			note.date = date;
			note.text = text;
			note.author = author;
			note.members = members;
			note.families = families;
			note.save(function(error) {
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
