export function login(req, res, Users) {
	const {username, password} = req.body;
	Users.authenticate(username, password, (error, user) => {
		if (error || !user) {
			req.session.userId = null;
			req.session.isAdmin = false;
			return res.json({success: false, error});
		} else {
			req.session.userId = user._id;
			req.session.isAdmin = user.isAdmin;
			return res.json({success: true});
		}
	})
}
