var secrets = {
	dbUri: 'mongodb://ministering:Csu-ZWX-c3Q-vwZ@ds229552.mlab.com:29552/ministering'
}

module.exports = function(key) {
	return secrets[key];
}
