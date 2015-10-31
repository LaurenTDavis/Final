angular.module('App', ['ngRoute']);


angular.module('App')
	.config(['$routeProvider', function($routeProvider){
		// No need to define #, it is assumed
		$routeProvider
			.when('/', {
				templateUrl : '/html/index.html',
				controller : 'mainController'
			})
			.when('/auth/login', {
				templateUrl : '/html/login.html',
				controller : 'authService'
			})
			.when('/auth/signup', {
				templateUrl : '/html/signup.html',
				controller : 'authService'
			})
			.when('/locate', {
				templateUrl : '/html/locate.html',
				controller: 'locateController'
			})
			.when('/trucks', {
				templateUrl : '/html/trucks.html',
				controller: 'truckController'
			})
			.when('/account/:username', {
				templateUrl : 'html/account.html',
				controller : 'truckController'
			})

	}])


angular.module('App')
	.service('authService', ['$http', '$location', function($http){
		
		this.authCheck = function(cb){
			$http.get('/api/me')
				.then( function(returnData){
					cb(returnData.data)

				})
		}
					
						
	}])

angular.module('App')
	.controller('mainController', ['$scope', '$http', 'authService', '$routeParams', function($scope, $http, authService, $routeParams){
		console.log('AUTH', authService)
		
		authService.authCheck(function(user){
			console.log('USER!', user)
			$scope.user = user
		})

	}])

angular.module('App')
    .controller("navController", ['$scope', '$http', 'authService', function($scope, $http, authService) {
        $scope.loggedIn = false;
        authService.authCheck(function(user){
            console.log('USER!', user)
            if (user) {
                $scope.loggedIn = true;
            }
    })
        
        
    }])

angular.module('App')
	.controller('locateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		

	var lat; 
	var lon; 
	// Maps! 

	function initialize(location) {

	  console.log(location);

	  var mapOptions = {

	      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
	      zoom: 12
	    };
	       	var map = new google.maps.Map(document.getElementById("map"),
	        mapOptions);
	         // This event listener calls addMarker() when the map is clicked.
	  google.maps.event.addListener(map, 'click', function(event) {
	    addMarker(event.latLng, map);
	  });

	  // Add a marker at the center of the map.
	  addMarker(mapOptions.center, map);
	}

	// Adds a marker to the map.
	function addMarker(location, map) {
	  // Add the marker at the clicked location, and add the next-available label
	  // from the array of alphabetical characters.
	  var marker = new google.maps.Marker({
	    position: location,
	    map: map
	  });
	  }

	  $(document).ready(function() {
	  	navigator.geolocation.getCurrentPosition(initialize);
	  });
	
		

	}])

angular.module('App')
	.controller('truckController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		
	$scope.title = "Track that Truck"

		$http.get('/api/me')
			.then(function(returnData){
				$scope.trucks = returnData.data
			})

		$scope.createTruck = function(){

			$http.post('/api/me', $scope.newTruck) //Req TO SERVER
				.then(function(returnData){ //Res FROM SERVER
					console.log('Made a Truck! ', returnData)
				})

		}
		var truckName = $routeParams.truckName

		console.log('Truck name,', truckName)

		$http.get('/api/trucks/' + truckName)
			.then(function(returnData){
				$scope.hero = returnData.data
			})


	// Account Set Up
	$scope.overview = true
	$scope.viewOverview = function() {
        $scope.edit = false;
        $scope.location = false;
        $scope.schedule = false;
        $scope.preference = false;
        $scope.overview = true;
	}
	$scope.viewEdit = function() {
        $scope.edit = true;
        $scope.location = false;
        $scope.schedule = false;
        $scope.preference = false;
        $scope.overview = false;
	}
	$scope.viewLocation = function() {
        $scope.edit = false;
        $scope.location = true;
        $scope.schedule = false;
        $scope.preference = false;
        $scope.overview = false;
	}
	$scope.viewSchedule= function() {
        $scope.edit = false;
        $scope.location = false;
        $scope.schedule = true;
        $scope.preference = false;
        $scope.overview = false;
	}

		

	}])




