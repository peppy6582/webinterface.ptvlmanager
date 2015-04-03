'use strict';

ptvlKodi.controller('movieListCtrl', ['$scope', 'movieList', function($scope, movieList) {

    $scope.movies = movieList.async();
    console.log($scope.movies);

}]);