import {isLoggedInAdmin} from '../utils';

export function deleteFamily(req, res, Families) {
	if (isLoggedInAdmin(req)) {
		const {familyId} = req.params;
		if (familyId) {
			Families.deleteOne({_id: familyId}, (error) => {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			})
		} else {
			return res.json({succes: false, error: 'No family id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in admin to delete family'});
	}

}
