import mongoose, {Schema} from 'mongoose';

// Notes model
const NotesSchema = new Schema({
	date: Date,
	text: String,
	author: String,
	members: [String],
	families: [String]
}, {timestamps: true});
export const Notes = mongoose.model('Notes', NotesSchema);
