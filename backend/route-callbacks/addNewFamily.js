var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Families) {
	if (isLoggedInAdmin(req)) {
		var family = new Families();
		var name = req.body.name;
		var head = req.body.head;

		if (name && head) {
			family.name = name;
			family.head = head;
			family.save(function(error) {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: family});
				}
			})
		} else {
			return res.json({success: false, error: 'You must provide name and head(s) of family'});
		}
	} else {
		return res.json({success: false, error: 'You must be a logged in admin to add a new family'});
	}
}
