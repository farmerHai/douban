'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.movice_list'
])
	.config([ '$routeProvider', function( $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
	.controller('navController',['$scope','$location', function ($scope,$location) {
		$scope.$location=$location;
		console.log(11111);
		$scope.$watch('$location.path()', function (now) {
			if(now.startsWith('/in_theaters')){
			    $scope.type='in_theaters';
			}else if(now.startsWith('/top250')){
				$scope.type='in_theaters';
			}else if(now.startsWith('/coming_soon')){
				$scope.type='coming_soon';
			}

		})
	}])
