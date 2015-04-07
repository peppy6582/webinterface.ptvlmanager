define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', 'channelList', function($scope, settingsList, channelList) {

        settingsList.async().then(function (d) {
            $scope.settings = d;

        });

        channelList.async().then(function (d) {
            $scope.channels = d;



        });

        $scope.showContent = function($fileContent){
            $scope.content = $fileContent;
        };

        $scope.channels = $scope.showContent(function($fileContent){
            return $fileContent;
        });

        console.log($scope.channels);


    }]);
})