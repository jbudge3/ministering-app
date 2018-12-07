var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Members) {
	if (isLoggedInAdmin(req)) {
		var member = new Members();
		var name = req.body.name;

		if (name) {
			member.name = name;
			member.save(function(error) {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: member});
				}
			})
		} else {
			return res.json({success: false, error: 'You must provide a name to add a new quorum member'});
		}
	} else {
		return res.json({success: false, error: 'You must be a logged in admin to add a new quorum member'});
	}
}
