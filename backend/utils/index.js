module.exports = {
	isLoggedIn: function(req) {
		return (req.session && req.session.userId);
	},
	isLoggedInAdmin: function(req) {
		return (req.session && req.session.userId && req.session.isAdmin);
	}
};
