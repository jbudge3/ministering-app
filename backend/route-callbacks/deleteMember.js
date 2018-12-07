var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Members) {
	if (isLoggedInAdmin(req)) {
		var memberId = req.params.memberId;
		if (memberId) {
			Members.deleteOne({_id: memberId}, function(error) {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			});
		} else {
			return res.json({succes: false, error: 'No member id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in admin to delete quorum member'});
	}

}
