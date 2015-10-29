var mongoose = require('mongoose');

var truckSchema = mongoose.Schema({
	name			: {type : String},
	picture 		: {}

});

module.exports = mongoose.model('Foodtruck', truckSchema);