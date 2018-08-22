export function getAllUsers(req, res, Users) {
	Users.find((error, users) => {
		if (error) {
			return res.json({success: false, error});
		} else {
			return res.json({success: true, data: users});
		}
	});
}
