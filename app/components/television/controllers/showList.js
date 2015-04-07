'use strict';

ptvlKodi.controller('showListCtrl', ['$scope', 'showList', function($scope, showList) {

    showList.async().then(function(d) {
        $scope.shows = d;
    });


}]);