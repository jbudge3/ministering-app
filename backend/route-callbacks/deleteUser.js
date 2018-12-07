var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Users) {
	if (isLoggedInAdmin(req)) {
		var userId = req.params.userId;
		if (userId) {
			Users.deleteOne({_id: userId}, function(error) {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			})
		} else {
			return res.json({succes: false, error: 'No user id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in admin to delete user'});
	}

}
