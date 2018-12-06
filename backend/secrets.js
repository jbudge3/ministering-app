const secrets = {
	dbUri: 'mongodb://ministering:Csu-ZWX-c3Q-vwZ@ds229552.mlab.com:29552/ministering'
}

export const getSecret = key => secrets[key];
