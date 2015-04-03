'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.bootstrap', 'ui.router']);


ptvlKodi.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('index.html');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'view/partial/home.html'
        })

}]);