'use strict';

ptvlKodi.controller('moviesListCtrl', ['$scope', 'moviesList', function($scope, moviesList) {

    moviesList.async().then(function(d) {
        $scope.movies = d;
        console.log($scope.movies);
    });

    

}]);