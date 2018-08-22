import mongoose, {Schema} from 'mongoose';

// Users model
const UsersSchema = new Schema({
	name: String,
	username: String,
	password: String,
	isAdmin: Boolean
});
export const Users = mongoose.model('Users', UsersSchema);

// Members model
const MembersSchema = new Schema({
	name: String
});
export const Members = mongoose.model('Members', MembersSchema);

// Families model
const FamiliesSchema = new Schema({
	name: String,
	head: String
});
export const Families = mongoose.model('Families', FamiliesSchema);

// Notes model
const NotesSchema = new Schema({
	date: Date,
	text: String,
	author: Number,
	members: [Number],
	families: [Number]
}, {timestamps: true});
export const Notes = mongoose.model('Notes', NotesSchema);
