// Dependecy imports
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
// Local utility imports
var getSecret = require('./secrets');
// Model imports
var Users = require('./models/users');
var Members = require('./models/members');
var Families = require('./models/families');
var Notes = require('./models/notes');
// Endpoint callbacks
var	getAllUsers = require('./route-callbacks/getAllUsers');
var	addNewUser = require('./route-callbacks/addNewUser');
var	login = require('./route-callbacks/login');
var	deleteUser = require('./route-callbacks/deleteUser');
var	addNewMember = require('./route-callbacks/addNewMember');
var	deleteMember = require('./route-callbacks/deleteMember');
var	addNewFamily = require('./route-callbacks/addNewFamily');
var	deleteFamily = require('./route-callbacks/deleteFamily');
var	addNewNote = require('./route-callbacks/addNewNote');
var	deleteNote = require('./route-callbacks/deleteNote');
var	getAllNotes = require('./route-callbacks/getAllNotes');
var	getAllMembers = require('./route-callbacks/getAllMembers');
var	getAllFamilies = require('./route-callbacks/getAllFamilies');

// Initialize express/router
var app = express();
var router = express.Router();

// API and DB setup
var API_PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
	secret: 'ministering secret',
	resave: true,
	saveUninitialized: false
}));

// GET routes
router.get('/users', function(req, res) { getAllUsers(req, res, Users) });
router.get('/notes', function(req, res) { getAllNotes(req, res, Notes) });
router.get('/members', function(req, res) { getAllMembers(req, res, Members) });
router.get('/families', function(req, res) { getAllFamilies(req, res, Families) });
// POST routes
router.post('/login', function(req, res) { login(req, res, Users) });
router.post('/users', function(req, res) { addNewUser(req, res, Users) });
router.post('/members', function(req, res) { addNewMember(req, res, Members) });
router.post('/families', function(req, res) { addNewFamily(req, res, Families) });
router.post('/notes', function(req, res) { addNewNote(req, res, Notes) });
// DELETE routes
router.delete('/users/:userId', function(req, res) { deleteUser(req, res, Users) });
router.delete('/members/:memberId', function(req, res) { deleteMember(req, res, Members) });
router.delete('/families/:familyId', function(req, res) { deleteFamily(req, res, Families) });
router.delete('/notes/:noteId', function(req, res) { deleteNote(req, res, Notes) });

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
	// Serve static file
	app.use(express.static('../client/build'));
	app.get('*', function(req, res) {
		res.sendFile(path.resolve('../client', 'build', 'index.html'));
	});
}


// Listen
app.listen(API_PORT, function() { console.log(`Listening on port ${API_PORT}`) });
