var truck = require('../models/truck');
var truckDB = require('../models/truckDB');
// Define our Route Handlers

// Create a NEW Hero
var createHero = function(req, res){
	// Data from a POST request lives in req.body


	// Check to see if the HQ entered into the form already exists
	HQ.findOne({name : req.body.HQ}, function(err, headquarters){
		// IF EXISTS -> create Hero with existing HQ
		if(headquarters){

			var newHero = new Hero({
				name			: req.body.name,
				HQ				: headquarters._id,
				alignment		: req.body.alignment,
				powerLevel		: +req.body.powerLevel,
				sidekick		: req.body.sidekick,
				archNemesis		: req.body.archNemesis === 'true' ? true : false,
				powers			: req.body.powers.split(', '),
				weaknesses		: req.body.weaknesses.split(', '),
				costume			: req.body.costume,
			})

			newHero.save(function(err, doc){
				res.send(doc)
			})

		}
		// ELSE -> create HQ and then the Hero
		else{

			// Since our Heros now require references to an HQ document from the DB
			// We need to create it first
			var newHQ = new HQ({
				name : req.body.HQ
			})
			// Save to DB
			newHQ.save(function(err, doc){
				// We create the hero now INSIDE of the document
				// SAVE method callback.
				var newHero = new Hero({
					name			: req.body.name,
					HQ				: doc._id,
					alignment		: req.body.alignment,
					powerLevel		: +req.body.powerLevel,
					sidekick		: req.body.sidekick,
					archNemesis		: req.body.archNemesis === 'true' ? true : false,
					powers			: req.body.powers.split(', '),
					weaknesses		: req.body.weaknesses.split(', '),
					costume			: req.body.costume,
				})

				newHero.save( function(err, doc){
					res.send(doc)
				} )
			})

		}

	})

	

}

var findHeroes = function(req, res) {
	// console.log('before')
	// var myFile = fs.readFileSync('WarAndPeace')
	// console.log('after')

	// console.log('before')
	// fs.readFile('WarAndPeace', function(err, data){
	// 	console.log('Inside Callback!')
	// 	// CODE THAT RELIES ON WAR AND PEACE
	// })
	// console.log('after')
	// // SUPER IMPORTANT CODE THAT CAN EXECUTE BECAUSE ITS NOT HELD UP BY READFILE


	// var heroes = []
	console.log('REQ PARAMs', req.params)
	if (req.params.heroName){
		Hero.findOne({name : req.params.heroName}, function(err, doc){
			res.send(doc)
		})
	}
	else{

		// Hero.find({}, function(err, docs){
		// 	res.send(docs)
		// })


		// Exec is always the final method in chained mongoose methods
		// It gives us access to the callback function that would normally be passed in on our FIND method
		
		// Populate takes a space delimited string of property names to populate
		Hero.find({HQ : "562aab9838e821682445738d"}).populate('HQ').exec(function(err, docs){
			res.send(docs)

			// WITHOUT POPULATE
			// {
			//	HQ : ObjectId('5849034059823489234')
			//}

			// WITH POPULATE
			// {
			//	HQ : {
			//		_id : ObjectId('5849034059823489234'),
			//		name : 'Fairy Forest'
			//	}
			//}
			
		})



	}
	// res.send(heroes)
}

module.exports = {
	createHero : createHero,
	findHeroes : findHeroes,
}

