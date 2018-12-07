var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Families model
var FamiliesSchema = new Schema({
	name: String,
	head: String
});

var Families = mongoose.model('Families', FamiliesSchema);

module.exports = Families; 
