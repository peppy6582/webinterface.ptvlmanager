define(['./ptvl'], function (ptvlDirectives) {
    'use strict';

    ptvlDirectives.directive('chHeader', function () {
        return {
            restrict: 'E', //This means that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            scope: {
              channel: '='
            },
            transclude: false,
            templateUrl: "app/components/ptvl/templates/channel-header.html",
            controller: ['$scope', function ($scope) {
                console.log($scope.channel);
            }]
        }
    });
});