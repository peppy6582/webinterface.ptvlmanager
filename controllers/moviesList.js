'use strict';

ptvlKodi.controller('moviesListCtrl', ['$scope', 'moviesList', 'moviesDetails', '$modal', '$log', '$state', function($scope, moviesList, moviesDetails, $modal, $log, $state) {

    moviesList.async().then(function(d) {
        $scope.movies = d;
    });

    // Opens Movie Details Modal Window
    this.modalDetails = function (size, selectedMovieid) {

        var modalInstance = $modal.open({
            templateUrl: 'view/movies/movies-details.html',
            controller: function ($scope, $modalInstance, movieid) {

                $scope.oneAtATime = true;
                $scope.members = true;

                $scope.movieid = movieid;

                moviesDetails.async($scope.movieid).then(function(d) {
                    //This returns the Movie Details
                    $scope.details = d;

                    //This take the movie poster url, and converts it to something that can be opened in an img tag
                    var movieThumb = $scope.details.thumbnail.replace("image://http://image.tmdb.org/t/p/original/", "");
                    $scope.movieThumb = movieThumb;



                    $scope.getTrailer = function(trailer) {
                        var videoId = trailer.replace("plugin://plugin.video.youtube/?action=play_video&videoid=", "");
                        return 'https://www.youtube.com/embed/' + videoId;
                    }
                });

                //This takes the actors thumbnail urls, and converts it to an array of things that can be opened in an img tag,
                //and adds the actors order number.
                $scope.actorThumb = function(order, thumbnail){
                    var actorThumb = thumbnail.replace("image://http://image.tmdb.org/t/p/original/", "");
                    $scope.actorThumb[order] = actorThumb;
                };



                $scope.ok = function () {

                };

                $scope.cancel = function () {

                    $modalInstance.dismiss('cancel');
                };

            },
            size: size,
            resolve: {
                movieid: function () {

                    return selectedMovieid;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $state.go('movies');
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);