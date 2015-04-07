define(['./television'], function (televisionControllers) {
    'use strict';

    televisionControllers.controller('showDetailsCtrl', ['$scope', '$modal', '$state', '$log', 'showDetails', function ($scope, $modal, $state, $log, showDetails) {

        // Opens Movie Details Modal Window
        this.modalDetails = function (size, selectedShowid) {

            var modalInstance = $modal.open({
                templateUrl: 'app/components/television/show-details.html',
                controller: function ($scope, $state, $modalInstance, tvshowid) {

                    $scope.oneAtATime = true;
                    $scope.members = true;

                    $scope.tvshowid = tvshowid;

                    showDetails.async($scope.tvshowid).then(function (d) {
                        //This returns the Movie Details
                        $scope.details = d;
                        console.log($scope.details);

                        //This take the show poster url, and converts it to something that can be opened in an img tag
                        var tvshowThumb = "";
                        //If the image is a tmdb.org image, fix the url to pull from there
                        if ($scope.details.thumbnail.contains('image.tmdb.org')) {
                            tvshowThumb = $scope.details.thumbnail.replace("image://http://image.tmdb.org/t/p/original/", "");
                            $scope.tvshowThumb = "http://image.tmdb.org/t/p/original" + tvshowThumb;

                            //If the image is local, fix the url to pull from the local folder
                        } else {
                            tvshowThumb = '/image/image%3A%2F%2F' + encodeURI($scope.details.thumbnail.replace("image://", ""));
                            $scope.tvshowThumb = tvshowThumb;
                        }

                        $scope.getTrailer = function (trailer) {
                            var videoId = trailer.replace("plugin://plugin.video.youtube/?action=play_video&videoid=", "");
                            return 'https://www.youtube.com/embed/' + videoId;
                        }
                    });

                    //This takes the actors thumbnail urls, and converts it to an array of things that can be opened in an img tag,
                    //and adds the actors order number.
                    $scope.actorThumb = function (order, thumbnail) {
                        var actorThumb = thumbnail.replace("image://http%3a%2f%2fthetvdb.com%2fbanners%2factors%2f", "");
                        actorThumb = actorThumb.substring(0, actorThumb.length - 1);
                        $scope.actorThumb[order] = actorThumb;
                        console.log($scope.actorThumb[order]);
                    };


                    $scope.ok = function () {

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    tvshowid: function () {
                        $state.go('shows.details');
                        return selectedShowid;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $state.go('shows');
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }]);
});