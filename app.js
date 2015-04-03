'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);


ptvlKodi
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('movies', {
                url: '/movies',
                templateUrl: 'view/partial/movies-list.html'
            })

    }]);
