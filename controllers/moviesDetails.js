'use strict';

ptvlKodi.controller('moviesDetailsCtrl', ['$scope', '$modal', '$state', '$log', 'moviesDetails', function($scope, $modal, $state, $log, moviesDetails) {

    // Opens Movie Details Modal Window
    this.modalDetails = function (size, selectedMovieid) {

        var modalInstance = $modal.open({
            templateUrl: 'view/movies/movies-details.html',
            controller: function ($scope, $state, $modalInstance, movieid) {

                $scope.oneAtATime = true;
                $scope.members = true;

                $scope.movieid = movieid;

                moviesDetails.async($scope.movieid).then(function(d) {
                    //This returns the Movie Details
                    $scope.details = d;

                    //This take the movie poster url, and converts it to something that can be opened in an img tag
                    var movieThumb = "";

                    //If the image is a tmdb.org image, fix the url to pull from there
                    if($scope.details.thumbnail.includes('image.tmdb.org')) {
                        movieThumb = $scope.details.thumbnail.replace("image://http://image.tmdb.org/t/p/original/", "");
                        $scope.movieThumb = "http://image.tmdb.org/t/p/original"+movieThumb;

                        //If the image is local, fix the url to pull from the local folder
                    } else {
                        movieThumb = '/image/image%3A%2F%2F' + encodeURI($scope.details.thumbnail.replace("image://", ""));
                        $scope.movieThumb = movieThumb;
                    }

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
                    $state.go('movies.details');
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