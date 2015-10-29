var mongoose = require('mongoose');

// Define our Schema for the DB
var finalDBSchema = mongoose.Schema({
	name			: {type : String}
});

// Being modelling the collection
module.exports = mongoose.model('truckusers', finalDBSchema);