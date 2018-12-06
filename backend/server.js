// Dependecy imports
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
// Local utility imports
import { getSecret } from './secrets';
// Model imports
import {
	Users,
	Members,
	Families,
	Notes,
} from './models';
// Endpoint callbacks
import {
	getAllUsers,
	addNewUser,
	login,
	deleteUser,
	addNewMember,
	deleteMember,
	addNewFamily,
	deleteFamily,
	addNewNote,
	deleteNote,
	getAllNotes,
	getAllMembers,
	getAllFamilies,
} from './route-callbacks';

// Initialize express/router
const app = express();
const router = express.Router();

// API and DB setup
const API_PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || getSecret('dbUri'), {useNewUrlParser: true});
const db = mongoose.connection;
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
router.get('/users', (req, res) => getAllUsers(req, res, Users));
router.get('/notes', (req, res) => getAllNotes(req, res, Notes));
router.get('/members', (req, res) => getAllMembers(req, res, Members));
router.get('/families', (req, res) => getAllFamilies(req, res, Families));
// POST routes
router.post('/login', (req, res) => login(req, res, Users));
router.post('/users', (req, res) => addNewUser(req, res, Users));
router.post('/members', (req, res) => addNewMember(req, res, Members));
router.post('/families', (req, res) => addNewFamily(req, res, Families));
router.post('/notes', (req, res) => addNewNote(req, res, Notes));
// DELETE routes
router.delete('/users/:userId', (req, res) => deleteUser(req, res, Users));
router.delete('/members/:memberId', (req, res) => deleteMember(req, res, Members));
router.delete('/families/:familyId', (req, res) => deleteFamily(req, res, Families));
router.delete('/notes/:noteId', (req, res) => deleteNote(req, res, Notes));

if (process.env.NODE_ENV === 'production') {
	// Serve static file
	app.use(express.static('../client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('../client', 'build', 'index.html'));
	});
}


// Listen
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
