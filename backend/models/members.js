var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Members model
var MembersSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
});

var Members = mongoose.model('Members', MembersSchema);
module.exports = Members;
