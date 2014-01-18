'use strict';
//Define an angular module for our app
var PaginationApp = angular.module('PaginationApp', ['ngRoute', 'ngResource']);

/* Router */
PaginationApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/orders', {
                templateUrl: 'partials/order-list.html',
                controller: 'OrderController'
            }).
            otherwise({
                redirectTo: '/orders'
            });
    }
]);

PaginationApp.controller('OrderController', ['$scope', '$http',
    function($scope, $http){
        $scope.$parent.selected = 4;
        $scope.showProduct = false;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.orders = [];
        $scope.selPage = 1;
        $http.get('data/orders.json')
            .success(function(response){
                $scope.orders = response;
                $scope.noOfPages = Math.round($scope.orders.length/$scope.pageSize)
            })
            .error(function(response){ /*todo error case */ });
    }
]);


/* Filter */
PaginationApp.filter('startFrom', function() {
    return function(data, index){
        index = +index; //parse to int
        return data.slice(index);
    }
});