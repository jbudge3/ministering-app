// Dependecy imports
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
// Local utility imports
import {getSecret} from './secrets';
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
} from './route-callbacks';

// Initialize express/router
const app = express();
const router = express.Router();

// API and DB setup
const API_PORT = process.env.API_PORT || 3001;
mongoose.connect(getSecret('dbUri'), {useNewUrlParser: true});
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
// POST routes
router.post('/users', (req, res) => addNewUser(req, res, Users));
router.post('/login', (req, res) => login(req, res, Users));
router.post('/members', (req, res) => addNewMember(req, res, Members));
// DELETE routes
router.delete('/users/:userId', (req, res) => deleteUser(req, res, Users));

// Listen
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
