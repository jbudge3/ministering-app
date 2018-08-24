import {isLoggedIn} from '../utils';

export function getAllMembers(req, res, Members) {
	if (isLoggedIn(req)) {
		Members.find((error, members) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: members});
			}
		})
	} else {
		return res.json({success: false, error: 'You must be logged in to get quorum members'});
	}
}
