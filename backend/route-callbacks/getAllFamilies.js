import {isLoggedIn} from '../utils';

export function getAllFamilies(req, res, Families) {
	if (isLoggedIn(req)) {
		Families.find((error, families) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: families});
			}
		})
	} else {
		return res.json({success: false, error: 'You must be logged in to get all families'});
	}
}
