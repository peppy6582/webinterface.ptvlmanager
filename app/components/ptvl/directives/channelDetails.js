define(['./ptvl'], function (ptvlDirectives) {
    'use strict';

    ptvlDirectives.directive('channelDetails', [function () {

        return {
            restrict: "E",
            replace: true,
            scope: {
                channel: "="
            },
            template: '<div ng-include="channel.type.templateUrl"></div>'

        }

    }]);
});
