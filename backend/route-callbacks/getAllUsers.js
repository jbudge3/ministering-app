import {isLoggedIn} from '../utils';

export function getAllUsers(req, res, Users) {
	if (isLoggedIn(req)) {
		Users.find((error, users) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: users});
			}
		});
	} else {
		return res.json({success: false, error: 'You must be logged in to get all users'});
	}

}
