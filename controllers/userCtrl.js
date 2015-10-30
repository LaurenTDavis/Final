// Include  Model
var User = require('../models/user');
var truckusers = require('../models/truckusersDB')


var createUser = function(req, res){
	truckusers.findOne({name : req.body.truckusers}, function(err, headquarters){
		// IF EXISTS -> create Hero with existing HQ
		if(headquarters){

			var newUser = new User({
				username 	: req.body.username,
				email 		: req.body.email,
				password	: req.body.password, 
			})

			newUser.save(function(err, doc){
				res.send(doc)
			})

		}
		else{

			// Since our Heros now require references to an HQ document from the DB
			// We need to create it first
			var newTruck = new truckusers({
				name : req.body.username
			})
			// Save to DB
			newTruck.save(function(err, doc){
				// We create the hero now INSIDE of the document
				// SAVE method callback.
				var newUser = new User({
					username 	: req.body.username,
					email 		: req.body.email,
					password	: req.body.password, 
				})

				newUser.save(function(err, doc){
					res.send(doc)
				})
			
			})

		}

	})

	

}

var findUser = function(req, res) {

	console.log('REQ PARAMs', req.params)
	if (req.params.username){
		User.findOne({username : req.params.username}, function(err, doc){
			res.send(doc)
		})
	}
	// else{

	// 	User.find({truckusers : "562aab9838e821682445738d"}).populate('truckusers').exec(function(err, docs){
	// 		res.send(docs)
			
	// 	})

	// }
}

module.exports = {
	createUser 	: createUser,
	findUser	: findUser,
}