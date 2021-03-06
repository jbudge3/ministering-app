var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(req, res, Users) {
	if (isLoggedIn(req)) {
		Users.find(function(error, users) {
			if (error) {
				return res.json({success: false, error});
			} else {
				console.log(req.session.userId);
				var editedUsers = users.map(function(user) {
					var editedUser = {};
					editedUser._id = user._id;
					editedUser.name = user.name;
					editedUser.username = user.username;
					editedUser.isAdmin = user.isAdmin;
					editedUser.isMe = user._id == req.session.userId;
					return editedUser;
				});
				return res.json({success: true, data: editedUsers});
			}
		});
	} else {
		return res.json({success: false, error: 'You must be logged in to get all users'});
	}

}
