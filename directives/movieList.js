'use strict';

ptvlKodi.directive('movieList', [function() {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: './view/movies/movies-list.html',
        link: function(scope, element, attrs){

        }
    };

}]);