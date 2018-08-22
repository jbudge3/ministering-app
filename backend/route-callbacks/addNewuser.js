export function addNewUser(req, res, Users) {
	const user = new Users();
	const {
		name,
		username,
		password,
		passwordConf
	} = req.body;
	if (name && username && password && passwordConf) {
		user.name = name;
		user.username = username;
		user.password = password;
		user.passwordConf = passwordConf
		user.save((error) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: user});
			}
		})
	} else {
		return res.json({success: false, error: 'You must provide name, username, password, and passwordConf'});
	}
}
