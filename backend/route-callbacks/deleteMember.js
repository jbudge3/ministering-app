import {isLoggedInAdmin} from '../utils';

export function deleteMember(req, res, Members) {
	if (isLoggedInAdmin(req)) {
		const {memberId} = req.params;
		if (memberId) {
			Members.deleteOne({_id: memberId}, (error) => {
				if (error) {
					return res.json({succes: false, error});
				}
				return res.json({success: true});
			})
		} else {
			return res.json({succes: false, error: 'No member id provided'});
		}
	} else {
		return res.json({success: false, error: 'Must be logged in admin to delete quorum member'});
	}

}
