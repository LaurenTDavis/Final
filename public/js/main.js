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
			.when('/account', {
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
	
	$scope.hello = "Food";
		
		authService.authCheck(function(user){
			console.log('USER!', user)
			$scope.user = user
		})

	}])

angular.module('App')
	.controller('locateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		
	$scope.hello = "Food";
	
		

	}])

angular.module('App')
	.controller('truckController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		
	$scope.hello = "Food";
	
		

	}])

angular.module('App')
	.controller('accountController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		
	$scope.hello = "Food";
	
		

	}])
	
