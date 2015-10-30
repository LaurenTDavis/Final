var mongoose = require('mongoose');

var truckSchema = mongoose.Schema({
	name			: {type : String},
	picture 		: {},
	HQ				: {type : mongoose.Schema.ObjectId, ref:'HQ'},

});

module.exports = mongoose.model('Foodtruck', truckSchema);