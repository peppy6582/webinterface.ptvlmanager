'use strict';

ptvlKodi.controller('moviesListCtrl', ['$scope', 'moviesList', 'moviesDetails', '$modal', '$log', '$state', function($scope, moviesList, moviesDetails, $modal, $log, $state) {

    moviesList.async().then(function(d) {
        $scope.movies = d;
    });


}]);