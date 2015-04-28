define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    function uniqueStudios(origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x].name === newArr[y].name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }

    ptvlControllers.controller('tvStudioCtrl', ['$scope', function ($scope) {

        $scope.studios = [];

        $scope.studio = {};

        console.log($scope.shows);
        for(var studio in $scope.shows) {
            $scope.studios[studio] =
            {
                id: studio,
                name: $scope.shows[studio].studio[0]
            }
        }

        $scope.studios = uniqueStudios($scope.studios);
        console.log($scope.studios);

        console.log($scope.channel);

        $scope.studio.name = $scope.channel.rules.main[1];


    }]);
});