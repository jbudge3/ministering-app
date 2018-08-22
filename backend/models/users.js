import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Users model
const UsersSchema = new Schema({
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
UsersSchema.statics.authenticate = (username, password, callback) => {
	Users.findOne({username: username})
		.exec((error, user) => {
			if (error) {
				return callback(error);
			} else if (!user) {
				const error = new Error('User not found');
				error.status = 401;
				return callback(error);
			}
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					return callback(null, user);
				} else {
					return callback();
				}
			})
		});
}
// Create password hash
UsersSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, function(error, hash) {
		if (error) {
			return next(error);
		}
		user.password = hash;
		next();
	});
});
// Create password confirmation hash
UsersSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.passwordConf, 10, function(error, hash) {
		if (error) {
			return next(error);
		}
		user.passwordConf = hash;
		next();
	});
});

export const Users = mongoose.model('Users', UsersSchema);
