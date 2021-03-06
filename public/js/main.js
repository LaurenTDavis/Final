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
			.when('/trucks/:name', {
				templateUrl : '/html/truckpage.html',
				controller: 'truckController'
			})
			.when('/account/:username', {
				templateUrl : 'html/account.html',
				controller : 'accountController'
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
            if (user) {
                $scope.loggedIn = true;
            }
    })

		authService.authCheck(function(user){
			$scope.user = user
		})
        
        
    }])

angular.module('App')
	.controller('locateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	
	var lat; 
	var lon; 

	// Maps! 
	var truckMarkers = []; 

	function initialize(location) {

	  console.log('Location', location);

	  var random1 = { lat : 40.02, lng : -105.24 };
	  var random2 = { lat : 40.01, lng : -105.22}

	  var mapOptions = {
	      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
	      zoom: 13
	    };
	       	var map = new google.maps.Map(document.getElementById("map"),
	        mapOptions);
	

	  // Add a marker at the center of the map.
	  	 addMarker(mapOptions.center, map, 'Cheezy Bizness');
	  	 addMarker(random1, map, 'Bun Truck');
	  	 addMarker(random2, map, 'SuperQ');

	}

	// Adds a marker to the map.
	function addMarker(location, map, contentString) {
	  // Add the marker at the clicked location, and add the next-available label
	  // from the array of alphabetical characters.

	  var marker = new google.maps.Marker({
	    position: location,
	    map: map
	  });
	  truckMarkers.push(marker)

	      
	   var infowindow = new google.maps.InfoWindow({
	    content: contentString
	  });

	 marker.addListener('click', function() {
	    infowindow.open(map, marker);
	  });

	}

	  $(document).ready(function() {
	  	navigator.geolocation.getCurrentPosition(initialize);
	  });		


	}])


angular.module('App')
	.controller('truckController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		
	$scope.title = "Track that Truck"

	$http.get('/api/trucks')
		.then(function(returnData){
			$scope.trucks = returnData.data
		})

	$scope.createTruck = function(){

		$http.post('/api/trucks', $scope.newTruck) //Req TO SERVER
			.then(function(returnData){ //Res FROM SERVER
				console.log('Made a Truck! ', returnData)
			})

	}
	var truckName = $routeParams.truckName

	$http.get('/api/trucks/' + truckName)
		.then(function(returnData){
			$scope.hero = returnData.data
		})

	$scope.editThis = false;
    $scope.letsEditThis = function() {
        $scope.editThis = !$scope.editThis
    }
        
     $scope.editUserAboutYou = function() {
         $http.post('/api/users/edituseraboutyou', $scope.currentUser)
            .then(function(returnData){
                console.log(returnData.data)
                
         })
         $scope.editThis = false;
     }
     
     $scope.editUserBasicInfo = function() {
         $http.post('/api/users/edituserbasicinfo', $scope.currentUser)
            .then(function(returnData){
                console.log(returnData.data)
         })
         $scope.editThis = false;
     }


	}])

angular.module('App')
	.controller('accountController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
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
	
	 $('img#logo').click(function(){                           
    $('#logoupload').trigger('click');
    $('#logoupload').change(function(e){

      var reader = new FileReader(),
           files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
            i = 0;

            reader.onload = onFileLoad;

             while (files[i]) reader.readAsDataURL(files[i++]);

              });

                function onFileLoad(e) {
                        var data = e.target.result;
                          $('img#logo').attr("src",data);
                          //Upload the image to the database
                           //Save data on keydown
                            $.post('test.php',{data:$('img#logo').attr("src")},function(){

                            });
                            }

                        });


	
	var lat; 
	var lon;  

	truckMarkers = [];


	function initialize(location) {

	  console.log('Location', location);
	
	  var mapOptions = {

	      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
	      zoom: 12
	    };
	       	var map = new google.maps.Map(document.getElementById("map"),
	        mapOptions);

	  	// addMarker(mapOptions.center, map);
	 	$scope.add = function() {
    		addMarker(mapOptions.center, map);	
  		}


  		$scope.remove = function() {
			deleteMarkers()
		}
	}


	function addMarker(location, map) {
	  var marker = new google.maps.Marker({
	    position: location,
	    map: map
	  });
	  truckMarkers.push(marker);
	 }

	function setMapOnAll(map) {
	  for (var i = 0; i < truckMarkers.length; i++) {
	    truckMarkers[i].setMap(map);
	  }
	}

	function clearMarkers() {
		setMapOnAll(null);
	}

	function showMarkers() {
	  setMapOnAll(map);
	}

	function deleteMarkers() {
	  clearMarkers();
	  markers = [];
	}


	  $(document).ready(function() {
	  	navigator.geolocation.getCurrentPosition(initialize);
	  });	


}])




