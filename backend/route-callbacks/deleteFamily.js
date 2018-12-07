var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Families) {
	if (isLoggedInAdmin(req)) {
		var familyId = req.params.familyId;
		if (familyId) {
			Families.deleteOne({_id: familyId}, function(error) {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			});
		} else {
			return res.json({succes: false, error: 'No family id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in admin to delete family'});
	}

}
