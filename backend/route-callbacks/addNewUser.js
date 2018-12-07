var isLoggedInAdmin = require('../utils').isLoggedInAdmin;

module.exports = function(req, res, Users) {
	if (isLoggedInAdmin(req)) {
		var user = new Users();
		var name = req.body.name;
		var username = req.body.username;
		var password = req.body.password;
		var passwordConf = req.body.passwordConf;
		var isAdmin = req.body.isAdmin;

		if (name && username && password && passwordConf) {
			user.name = name;
			user.username = username;
			user.password = password;
			user.passwordConf = passwordConf;
			if (isAdmin) {
				user.isAmdin = isAdmin;
			} else {
				user.isAdmin = false;
			}

			user.save(function(error) {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: user});
				}
			})
		} else {
			return res.json({success: false, error: 'You must provide name, username, password, passwordConf, and isAdmin'});
		}
	} else {
		return res.json({success: false, error: 'You must be a logged in admin to add a new user'});
	}

}
