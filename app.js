'use strict';

var ptvlKodi = angular.module('ptvlKodi', ['ui.bootstrap', 'ui.router', 'loadOnDemand']);


ptvlKodi
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('index.html');

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'view/partial/home.html'
            })

    }])

    .config(['$loadOnDemandProvider', function ($loadOnDemandProvider) {
        var modules = [
            {
                name: 'moviesListCtrl',     // name of module
                script: 'controllers/moviesList.js' // path to javascript file
            },
            {
                name: 'movieList',     // name of module
                script: 'services/moviesList.js' // path to javascript file
            }
        ];
        $loadOnDemandProvider.config(modules);
        console.log(modules);
    }]);