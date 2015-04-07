define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', function($scope, settingsList) {

        settingsList.async().then(function (d) {
            $scope.settings = d;
        });

    }]);
})