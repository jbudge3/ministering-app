export function isLoggedIn(req) {
	return (req.session && req.session.userId);
}

export function isLoggedInAdmin(req) {
	return (req.session && req.session.userId && req.session.isAdmin)
}
