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
router.get('/', (req, res) => {
	res.json({message: 'Hello, world!'});
});
router.get('/users', (req, res) => {
	Users.find((error, users) => {
		if (error) {
			return res.json({success: false, error});
		} else {
			return res.json({success: true, data: users});
		}
	});
});
// POST routes
router.post('/users', (req, res) => {
	const user = new Users();
	const {
		name,
		username,
		password,
		passwordConf
	} = req.body;
	if (name && username && password && passwordConf) {
		user.name = name;
		user.username = username;
		user.password = password;
		user.passwordConf = passwordConf
		user.save((error) => {
			if (error) {
				return res.json({success: false, error});
			} else {
				return res.json({success: true, data: user});
			}
		})
	} else {
		return res.json({success: false, error: 'You must provide name, username, password, and passwordConf'});
	}
});
router.post('/login', (req, res) => {
	const {username, password} = req.body;
	Users.authenticate(username, password, (error, user) => {
		if (error || !user) {
			return res.json({success: false, error});
		} else {
			req.session.userId = user._id;
			return res.json({success: true});
		}
	})
});

// Listen
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
