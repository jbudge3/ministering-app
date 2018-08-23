import {isLoggedInAdmin} from '../utils';

export function addNewFamily(req, res, Families) {
	if (isLoggedInAdmin(req)) {
		const family = new Families();
		const {name, head} = req.body;
		if (name && head) {
			family.name = name;
			family.head = head;
			family.save((error) => {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: family});
				}
			})
		} else {
			return res.json({success: false, error: 'You must provide name and head(s) of family'});
		}
	} else {
		return res.json({success: false, error: 'You must be a logged in admin to add a new family'});
	}
}
