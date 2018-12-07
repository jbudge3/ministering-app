module.exports = function(req, res, Users) {
	var username = req.body.username;
	var password = req.body.password;

	Users.authenticate(username, password, function(error, user) {
		if (error || !user) {
			req.session.userId = null;
			req.session.isAdmin = false;
			return res.json({success: false, error});
		} else {
			req.session.userId = user._id;
			req.session.isAdmin = user.isAdmin;
			return res.json({success: true});
		}
	});
}
