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
