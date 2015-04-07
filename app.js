'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngTouch']);


ptvlKodi
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('movies', {
                url: '/movies',
                templateUrl: 'app/components/movies/movies.html'
            })

            .state('movies.details', {
                url: '/movie-details',
                parent: 'movies',
                templateUrl: 'app/components/movies/movies-details.html'
            })

            .state('shows', {
                url: '/shows',
                templateUrl: 'app/components/television/shows.html'
            })

            .state('shows.details', {
                url: '/show-details',
                parent: 'shows',
                templateUrl: 'app/components/television/show-details.html'
            })

            .state('ptvl', {
                url: '/ptvl',
                templateUrl: 'app/components/ptvl/ptvl.html'
            })

    }])

    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    }]);


