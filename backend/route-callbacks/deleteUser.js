import {isLoggedInAdmin} from '../utils';

export function deleteUser(req, res, Users) {
	if (isLoggedInAdmin(req)) {
		const {userId} = req.params;
		if (userId) {
			Users.deleteOne({_id: userId}, (error) => {
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
