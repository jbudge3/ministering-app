var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Notes model
var NotesSchema = new Schema({
	date: Date,
	text: String,
	author: String,
	members: [String],
	families: [String]
}, {timestamps: true});

var Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;
