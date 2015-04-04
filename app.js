'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);


ptvlKodi
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('movies', {
                url: '/movies',
                templateUrl: 'view/movies/movies.html'
            })

            .state('moviesdetails', {
                url: '/movies-details',
                templateUrl: 'view/movies/movies-details.html'
            })

    }])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    }]);


