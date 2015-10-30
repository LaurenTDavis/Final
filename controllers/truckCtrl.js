var Truck = require('../models/truck');
var HQ = require('../models/truckDB');
// Define our Route Handlers

// Create a NEW Hero
var createTruck = function(req, res){
	// Data from a POST request lives in req.body


	// Check to see if the HQ entered into the form already exists
	HQ.findOne({name : req.body.name}, function(err, headquarters){
		// IF EXISTS -> create Hero with existing HQ
		if(headquarters){

			var newTruck= new Truck({
				name		: req.body.name,
				picture 	: req.body.picture,
				HQ			: headquarters._id,


			});

			newTruck.save(function(err, doc){
				res.send(doc)
			})

		}
		else{

			var newHQ = new HQ({
				name : req.body.HQ
			})
			// Save to DB
			newHQ.save(function(err, doc){
				// We create the hero now INSIDE of the document
				// SAVE method callback.
				var newTruck= new Truck({
					name		: req.body.name,
					picture 	: req.body.picture,
					HQ			: doc._id,
					
				});

				newTruck.save( function(err, doc){
					res.send(doc)
				} )
			})

		}

	})

	

}

var findTrucks = function(req, res) {

	console.log('REQ PARAMs', req.params)
	if (req.params.truckName){
		Truck.findOne({name : req.params.truckName}, function(err, doc){
			res.send(doc)
		})
	}
	else{

		Truck.find({HQ : "562aab9838e821682445738d"}).populate('HQ').exec(function(err, docs){
			res.send(docs)


			
		})



	}
	// res.send(heroes)
}

module.exports = {
	createTruck : createTruck,
	findTrucks : findTrucks,
}

