import {isLoggedInAdmin} from '../utils';

export function addNewMember(req, res, Members) {
	if (isLoggedInAdmin(req)) {
		const member = new Members();
		const {name} = req.body;
		if (name) {
			member.name = name;
			member.save((error) => {
				if (error) {
					return res.json({success: false, error});
				} else {
					return res.json({success: true, data: member});
				}
			})
		} else {
			return res.json({success: false, error: 'You must provide a name to add a new quorum member'});
		}
	} else {
		return res.json({success: false, error: 'You must be a logged in admin to add a new quorum member'});
	}
}
