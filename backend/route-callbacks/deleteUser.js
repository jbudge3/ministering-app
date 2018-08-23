export function deleteUser(req, res, Users) {
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
}
