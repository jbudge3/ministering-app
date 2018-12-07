var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(req, res, Members) {
	if (isLoggedIn(req)) {
		Members.find(function(error, members) {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: members});
			}
		});
	} else {
		return res.json({success: false, error: 'You must be logged in to get quorum members'});
	}
}
