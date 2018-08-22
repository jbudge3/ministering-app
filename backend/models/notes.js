import mongoose, {Schema} from 'mongoose';

// Notes model
const NotesSchema = new Schema({
	date: Date,
	text: String,
	author: Number,
	members: [Number],
	families: [Number]
}, {timestamps: true});
export const Notes = mongoose.model('Notes', NotesSchema);
