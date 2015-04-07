define(['./ptvlKodi'], function(ptvlKodi) {
    'use strict';
    return ptvlKodi.config(['$stateProvider', '$urlRouterProvider','$sceDelegateProvider',function($stateProvider, $urlRouterProvider, $sceDelegateProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('movies', {
                url: '/movies',
                templateUrl: 'app/components/movies/movies.html',
                controller: 'moviesListCtrl'
            })

            .state('movies.details', {
                url: '/movie-details',
                parent: 'movies',
                templateUrl: 'app/components/movies/movies-details.html',
                controller: 'moviesDetailsCtrl'
            })

            .state('shows', {
                url: '/shows',
                templateUrl: 'app/components/television/shows.html',
                controller: 'showListCtrl'
            })

            .state('shows.details', {
                url: '/show-details',
                parent: 'shows',
                templateUrl: 'app/components/television/show-details.html',
                controller: 'showDetailsCtrl'
            })

            .state('ptvl', {
                url: '/ptvl',
                templateUrl: 'app/components/ptvl/ptvl.html'
            });


        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);

    }]);
});