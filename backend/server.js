// Dependecy imports
import express from 'express';
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

// GET routes
router.get('/', (req, res) => {
	res.json({message: 'Hello, world!'});
});

// Listen
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
