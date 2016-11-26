(function (angular) {
	'use strict';
	var model = angular.module('myApp.movice_list', ['ngRoute','myapp.services']);

	model.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movice_list/view.html',
			controller: 'movice_listController'
		});
	}])

	model.controller('movice_listController',
		function (HttpService,$routeParams,$scope,$route) {
			var count=3;
			var page=parseInt($routeParams.page);
			var start=(page-1)*10;
			$scope.subjects=[];
			$scope.message='';
			$scope.totalCount=0;
			$scope.loading=true;
			$scope.totalpage=0;
			$scope.currentPage=page;
			$scope.title='';
			HttpService.$jsonp('http://api.douban.com/v2/movie/'+$routeParams.category,{count:count,start:start}, function (data) {
				$scope.title=data.title;
				$scope.subjects=data.subjects;
				$scope.totalCount=data.total;
				$scope.loading=false;
				$scope.totalPage=Math.ceil($scope.totalCount/count);
				$scope.$apply();
			})
			$scope.go= function (page) {
				if (page >= 1 && page <= $scope.totalPage) {
					$route.updateParams({page: page});
				}
			}
		});
})(angular);
//$scope.subjects = [];
//$scope.message = '';
//var doubanaddress='http://api.douban.com/v2/movie/in_theaters';
//console.log(22222);
//$http.jsonp(doubanaddress+'?callback=JSON_CALLBACK').then(function (res) {
//	console.log(1111);
//	if (res.status == 200) {
//		$scope.subjects = res.data.subjects;
//	} else {
//		$scope.message = '获取数据错误,错误信息:' + res.statusText;
//	}
//
//}, function (err) {
//	$scope.message = '获取数据错误,错误信息:' + err.statusText;
//})
