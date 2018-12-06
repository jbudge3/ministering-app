'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Families = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Families model
var FamiliesSchema = new _mongoose.Schema({
	name: String,
	head: String
});
var Families = exports.Families = _mongoose2.default.model('Families', FamiliesSchema);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

Object.defineProperty(exports, 'Users', {
  enumerable: true,
  get: function get() {
    return _users.Users;
  }
});

var _members = require('./members');

Object.defineProperty(exports, 'Members', {
  enumerable: true,
  get: function get() {
    return _members.Members;
  }
});

var _families = require('./families');

Object.defineProperty(exports, 'Families', {
  enumerable: true,
  get: function get() {
    return _families.Families;
  }
});

var _notes = require('./notes');

Object.defineProperty(exports, 'Notes', {
  enumerable: true,
  get: function get() {
    return _notes.Notes;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Members = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Members model
var MembersSchema = new _mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
});
var Members = exports.Members = _mongoose2.default.model('Members', MembersSchema);
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Notes = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Notes model
var NotesSchema = new _mongoose.Schema({
	date: Date,
	text: String,
	author: String,
	members: [String],
	families: [String]
}, { timestamps: true });
var Notes = exports.Notes = _mongoose2.default.model('Notes', NotesSchema);
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Users = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Users model
var UsersSchema = new _mongoose.Schema({
	name: String,
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConf: {
		type: String,
		required: true
	},
	isAdmin: Boolean
});
// Authenticate input against database
UsersSchema.statics.authenticate = function (username, password, callback) {
	Users.findOne({ username: username }).exec(function (error, user) {
		if (error) {
			return callback(error);
		} else if (!user) {
			var _error = new Error('User not found');
			_error.status = 401;
			return callback(_error);
		}
		_bcrypt2.default.compare(password, user.password, function (error, result) {
			if (result) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};
// Create password hash
UsersSchema.pre('save', function (next) {
	var user = this;
	_bcrypt2.default.hash(user.password, 10, function (error, hash) {
		if (error) {
			return next(error);
		}
		user.password = hash;
		next();
	});
});
// Create password confirmation hash
UsersSchema.pre('save', function (next) {
	var user = this;
	_bcrypt2.default.hash(user.passwordConf, 10, function (error, hash) {
		if (error) {
			return next(error);
		}
		user.passwordConf = hash;
		next();
	});
});

var Users = exports.Users = _mongoose2.default.model('Users', UsersSchema);
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addNewFamily = addNewFamily;

var _utils = require('../utils');

function addNewFamily(req, res, Families) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var family = new Families();
		var _req$body = req.body,
		    name = _req$body.name,
		    head = _req$body.head;

		if (name && head) {
			family.name = name;
			family.head = head;
			family.save(function (error) {
				if (error) {
					return res.json({ success: false, error: error });
				} else {
					return res.json({ success: true, data: family });
				}
			});
		} else {
			return res.json({ success: false, error: 'You must provide name and head(s) of family' });
		}
	} else {
		return res.json({ success: false, error: 'You must be a logged in admin to add a new family' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addNewMember = addNewMember;

var _utils = require('../utils');

function addNewMember(req, res, Members) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var member = new Members();
		var name = req.body.name;

		if (name) {
			member.name = name;
			member.save(function (error) {
				if (error) {
					return res.json({ success: false, error: error });
				} else {
					return res.json({ success: true, data: member });
				}
			});
		} else {
			return res.json({ success: false, error: 'You must provide a name to add a new quorum member' });
		}
	} else {
		return res.json({ success: false, error: 'You must be a logged in admin to add a new quorum member' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addNewNote = addNewNote;

var _utils = require('../utils');

function addNewNote(req, res, Notes) {
	if ((0, _utils.isLoggedIn)(req)) {
		var note = new Notes();
		var _req$body = req.body,
		    date = _req$body.date,
		    text = _req$body.text,
		    author = _req$body.author,
		    members = _req$body.members,
		    families = _req$body.families;

		if (!members || !families || !members.length || !families.length) {
			return res.json({ success: false, error: 'You must include at least one member and/or family' });
		} else if (date && text && author && members.length && families.length) {
			note.date = date;
			note.text = text;
			note.author = author;
			note.members = members;
			note.families = families;
			note.save(function (error) {
				if (error) {
					return res.json({ success: false, error: error });
				} else {
					return res.json({ success: true, data: note });
				}
			});
		}
	} else {
		return res.json({ success: false, error: 'You must be logged in to add a new note' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addNewUser = addNewUser;

var _utils = require('../utils');

function addNewUser(req, res, Users) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var user = new Users();
		var _req$body = req.body,
		    name = _req$body.name,
		    username = _req$body.username,
		    password = _req$body.password,
		    passwordConf = _req$body.passwordConf,
		    isAdmin = _req$body.isAdmin;

		if (name && username && password && passwordConf) {
			user.name = name;
			user.username = username;
			user.password = password;
			user.passwordConf = passwordConf;
			user.isAdmin = isAdmin ? isAdmin : false;
			user.save(function (error) {
				if (error) {
					return res.json({ success: false, error: error });
				} else {
					return res.json({ success: true, data: user });
				}
			});
		} else {
			return res.json({ success: false, error: 'You must provide name, username, password, passwordConf, and isAdmin' });
		}
	} else {
		return res.json({ success: false, error: 'You must be a logged in admin to add a new user' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deleteFamily = deleteFamily;

var _utils = require('../utils');

function deleteFamily(req, res, Families) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var familyId = req.params.familyId;

		if (familyId) {
			Families.deleteOne({ _id: familyId }, function (error) {
				if (error) {
					return res.json({ succes: false, error: error });
				}
				return res.json({ success: true });
			});
		} else {
			return res.json({ succes: false, error: 'No family id provided' });
		}
	} else {
		return res.json({ success: false, error: 'Must be logged in admin to delete family' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deleteMember = deleteMember;

var _utils = require('../utils');

function deleteMember(req, res, Members) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var memberId = req.params.memberId;

		if (memberId) {
			Members.deleteOne({ _id: memberId }, function (error) {
				if (error) {
					return res.json({ succes: false, error: error });
				}
				return res.json({ success: true });
			});
		} else {
			return res.json({ succes: false, error: 'No member id provided' });
		}
	} else {
		return res.json({ success: false, error: 'Must be logged in admin to delete quorum member' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deleteNote = deleteNote;

var _utils = require('../utils');

function deleteNote(req, res, Notes) {
	if ((0, _utils.isLoggedIn)(req)) {
		var noteId = req.params.noteId;

		if (noteId) {
			Notes.deleteOne({ _id: noteId }, function (error) {
				if (error) {
					return res.json({ succes: false, error: error });
				}
				return res.json({ success: true });
			});
		} else {
			return res.json({ succes: false, error: 'No note id provided' });
		}
	} else {
		return res.json({ success: false, error: 'Must be logged in to delete note' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deleteUser = deleteUser;

var _utils = require('../utils');

function deleteUser(req, res, Users) {
	if ((0, _utils.isLoggedInAdmin)(req)) {
		var userId = req.params.userId;

		if (userId) {
			Users.deleteOne({ _id: userId }, function (error) {
				if (error) {
					return res.json({ succes: false, error: error });
				}
				return res.json({ success: true });
			});
		} else {
			return res.json({ succes: false, error: 'No user id provided' });
		}
	} else {
		return res.json({ success: false, error: 'Must be logged in admin to delete user' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllFamilies = getAllFamilies;

var _utils = require('../utils');

function getAllFamilies(req, res, Families) {
	if ((0, _utils.isLoggedIn)(req)) {
		Families.find(function (error, families) {
			if (error) {
				return res.json({ success: false, error: error });
			} else {
				return res.json({ success: true, data: families });
			}
		});
	} else {
		return res.json({ success: false, error: 'You must be logged in to get all families' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllMembers = getAllMembers;

var _utils = require('../utils');

function getAllMembers(req, res, Members) {
	if ((0, _utils.isLoggedIn)(req)) {
		Members.find(function (error, members) {
			if (error) {
				return res.json({ success: false, error: error });
			} else {
				return res.json({ success: true, data: members });
			}
		});
	} else {
		return res.json({ success: false, error: 'You must be logged in to get quorum members' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllNotes = getAllNotes;

var _utils = require('../utils');

function getAllNotes(req, res, Notes) {
	if ((0, _utils.isLoggedIn)(req)) {
		Notes.find(function (error, notes) {
			if (error) {
				return res.json({ success: false, error: error });
			} else {
				return res.json({ success: true, data: notes });
			}
		});
	} else {
		return res.json({ success: false, error: 'You must be logged in to view notes' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllUsers = getAllUsers;

var _utils = require('../utils');

function getAllUsers(req, res, Users) {
	if ((0, _utils.isLoggedIn)(req)) {
		Users.find(function (error, users) {
			if (error) {
				return res.json({ success: false, error: error });
			} else {
				console.log(req.session.userId);
				var editedUsers = users.map(function (user) {
					var editedUser = {};
					editedUser._id = user._id;
					editedUser.name = user.name;
					editedUser.username = user.username;
					editedUser.isAdmin = user.isAdmin;
					editedUser.isMe = user._id == req.session.userId;
					return editedUser;
				});
				return res.json({ success: true, data: editedUsers });
			}
		});
	} else {
		return res.json({ success: false, error: 'You must be logged in to get all users' });
	}
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAllUsers = require('./getAllUsers');

Object.defineProperty(exports, 'getAllUsers', {
  enumerable: true,
  get: function get() {
    return _getAllUsers.getAllUsers;
  }
});

var _addNewUser = require('./addNewUser');

Object.defineProperty(exports, 'addNewUser', {
  enumerable: true,
  get: function get() {
    return _addNewUser.addNewUser;
  }
});

var _login = require('./login');

Object.defineProperty(exports, 'login', {
  enumerable: true,
  get: function get() {
    return _login.login;
  }
});

var _deleteUser = require('./deleteUser');

Object.defineProperty(exports, 'deleteUser', {
  enumerable: true,
  get: function get() {
    return _deleteUser.deleteUser;
  }
});

var _addNewMember = require('./addNewMember');

Object.defineProperty(exports, 'addNewMember', {
  enumerable: true,
  get: function get() {
    return _addNewMember.addNewMember;
  }
});

var _deleteMember = require('./deleteMember');

Object.defineProperty(exports, 'deleteMember', {
  enumerable: true,
  get: function get() {
    return _deleteMember.deleteMember;
  }
});

var _getAllMembers = require('./getAllMembers');

Object.defineProperty(exports, 'getAllMembers', {
  enumerable: true,
  get: function get() {
    return _getAllMembers.getAllMembers;
  }
});

var _addNewFamily = require('./addNewFamily');

Object.defineProperty(exports, 'addNewFamily', {
  enumerable: true,
  get: function get() {
    return _addNewFamily.addNewFamily;
  }
});

var _deleteFamily = require('./deleteFamily');

Object.defineProperty(exports, 'deleteFamily', {
  enumerable: true,
  get: function get() {
    return _deleteFamily.deleteFamily;
  }
});

var _getAllFamilies = require('./getAllFamilies');

Object.defineProperty(exports, 'getAllFamilies', {
  enumerable: true,
  get: function get() {
    return _getAllFamilies.getAllFamilies;
  }
});

var _addNewNote = require('./addNewNote');

Object.defineProperty(exports, 'addNewNote', {
  enumerable: true,
  get: function get() {
    return _addNewNote.addNewNote;
  }
});

var _getAllNotes = require('./getAllNotes');

Object.defineProperty(exports, 'getAllNotes', {
  enumerable: true,
  get: function get() {
    return _getAllNotes.getAllNotes;
  }
});

var _deleteNote = require('./deleteNote');

Object.defineProperty(exports, 'deleteNote', {
  enumerable: true,
  get: function get() {
    return _deleteNote.deleteNote;
  }
});
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = login;
function login(req, res, Users) {
	var _req$body = req.body,
	    username = _req$body.username,
	    password = _req$body.password;

	Users.authenticate(username, password, function (error, user) {
		if (error || !user) {
			req.session.userId = null;
			req.session.isAdmin = false;
			return res.json({ success: false, error: error });
		} else {
			req.session.userId = user._id;
			req.session.isAdmin = user.isAdmin;
			return res.json({ success: true });
		}
	});
}
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var secrets = {
	dbUri: 'mongodb://ministering:Csu-ZWX-c3Q-vwZ@ds229552.mlab.com:29552/ministering'
};

var getSecret = exports.getSecret = function getSecret(key) {
	return secrets[key];
};
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _secrets = require('./secrets');

var _models = require('./models');

var _routeCallbacks = require('./route-callbacks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize express/router

// Model imports
var app = (0, _express2.default)();
// Endpoint callbacks

// Local utility imports
// Dependecy imports

var router = _express2.default.Router();

// API and DB setup
var API_PORT = process.env.PORT || 3001;
_mongoose2.default.connect(process.env.MONGODB_URI || (0, _secrets.getSecret)('dbUri'), { useNewUrlParser: true });
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));
app.use((0, _expressSession2.default)({
	secret: 'ministering secret',
	resave: true,
	saveUninitialized: false
}));

// GET routes
router.get('/users', function (req, res) {
	return (0, _routeCallbacks.getAllUsers)(req, res, _models.Users);
});
router.get('/notes', function (req, res) {
	return (0, _routeCallbacks.getAllNotes)(req, res, _models.Notes);
});
router.get('/members', function (req, res) {
	return (0, _routeCallbacks.getAllMembers)(req, res, _models.Members);
});
router.get('/families', function (req, res) {
	return (0, _routeCallbacks.getAllFamilies)(req, res, _models.Families);
});
// POST routes
router.post('/login', function (req, res) {
	return (0, _routeCallbacks.login)(req, res, _models.Users);
});
router.post('/users', function (req, res) {
	return (0, _routeCallbacks.addNewUser)(req, res, _models.Users);
});
router.post('/members', function (req, res) {
	return (0, _routeCallbacks.addNewMember)(req, res, _models.Members);
});
router.post('/families', function (req, res) {
	return (0, _routeCallbacks.addNewFamily)(req, res, _models.Families);
});
router.post('/notes', function (req, res) {
	return (0, _routeCallbacks.addNewNote)(req, res, _models.Notes);
});
// DELETE routes
router.delete('/users/:userId', function (req, res) {
	return (0, _routeCallbacks.deleteUser)(req, res, _models.Users);
});
router.delete('/members/:memberId', function (req, res) {
	return (0, _routeCallbacks.deleteMember)(req, res, _models.Members);
});
router.delete('/families/:familyId', function (req, res) {
	return (0, _routeCallbacks.deleteFamily)(req, res, _models.Families);
});
router.delete('/notes/:noteId', function (req, res) {
	return (0, _routeCallbacks.deleteNote)(req, res, _models.Notes);
});

if (process.env.NODE_ENV === 'production') {
	// Serve static file
	app.use(_express2.default.static('../client/build'));
	app.get('*', function (req, res) {
		res.sendFile(_path2.default.resolve('../client', 'build', 'index.html'));
	});
}

// Listen
app.use('/api', router);
app.listen(API_PORT, function () {
	return console.log('Listening on port ' + API_PORT);
});
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isLoggedIn = isLoggedIn;
exports.isLoggedInAdmin = isLoggedInAdmin;
function isLoggedIn(req) {
	return req.session && req.session.userId;
}

function isLoggedInAdmin(req) {
	return req.session && req.session.userId && req.session.isAdmin;
}
