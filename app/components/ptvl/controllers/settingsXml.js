define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', function($scope, settingsList) {

        settingsList.async().then(function (d) {
            $scope.settings = d;

        });

        $scope.showContent = function($fileContent){
            $scope.content = $fileContent;
            var x2js = new X2JS();
            $scope.channels = x2js.xml_str2json($scope.content);
            console.log($scope.channels);
        };

    }]);
})