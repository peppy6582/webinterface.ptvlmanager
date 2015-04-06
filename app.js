'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngTouch']);


ptvlKodi
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('movies', {
                url: '/movies',
                templateUrl: 'view/movies/movies.html'
            })

            .state('movies.details', {
                url: '/details',
                parent: 'movies',
                templateUrl: 'view/movies/movies-details.html'
            })

    }])

    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    }]);


