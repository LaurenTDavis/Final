var mongoose = require('mongoose');

// Define our Schema for the DB
var truckDBSchema = mongoose.Schema({
	name			: {type : String}
});

// Being modelling the collection
module.exports = mongoose.model('HQ', truckDBSchema);