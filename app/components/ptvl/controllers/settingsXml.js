define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', function($scope, settingsList) {

        $scope.OneAtATime = false;

        settingsList.async().then(function (d) {
            $scope.settings = d;

        });

        $scope.newChannels = {};

        $scope.showContent = function($fileContent){

            $scope.settingsFile = $fileContent;
            var x2js = new X2JS();
            $scope.channels = x2js.xml_str2json($scope.settingsFile);

            function channelCount(obj) {
                var result = 0;
                for(var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        // or Object.prototype.hasOwnProperty.call(obj, prop)
                        result++;
                    }
                }
                return result;
            }

            var i = 0;

            var q = channelCount($scope.channels.settings.setting);

            q = q - 2;

            while (i <= q) {
                angular.forEach($scope.channels.settings.setting[i], function() {

                    var id = $scope.channels.settings.setting[i]._id;
                    var value = $scope.channels.settings.setting[i]._value;

                    if(isNaN(id.split('_')[1])) {

                        var channelNum = 0;

                        var channel =
                            {
                                '_id': id,
                                '_value': value
                            };

                        if(typeof $scope.newChannels[channelNum] === 'undefined') {
                            $scope.newChannels[channelNum] =
                                {
                                    'Channel': channelNum
                                }
                            ;
                            $scope.newChannels[channelNum].settings = [];
                        };
                        $scope.newChannels[channelNum].settings.push(channel);

                    } else {
                        var channelNum = parseInt(id.split('_')[1]);

                        var channel =
                            {
                                '_id': id,
                                '_value': value
                            };

                        if(typeof $scope.newChannels[channelNum] === 'undefined') {
                            $scope.newChannels[channelNum] =
                                {
                                    'Channel': channelNum
                                }
                            ;
                            $scope.newChannels[channelNum].settings = [];
                        };
                        $scope.newChannels[channelNum].settings.push( channel );
                    };
                    i = i + 1;
                });
            };
        };

        $scope.getSettings = function(channel){
            console.log(channel);
            var types = {
                 0: 'Playlist',
                 1: 'TV Network',
                 2: 'Movie Studio',
                 3: 'TV Genre',
                 4: 'Movie Genre',
                 5: 'Mixed Genre (TV & Movie)',
                 6: 'TV Show',
                 7: 'Directory',
                 8: 'LiveTV',
                 9: 'InternetTV',
                 10: 'YouTubeTV',
                 11: 'RSS',
                 12: 'Music (WIP)',
                 13: 'Music Videos'
            };

            var type = channel.settings[0]._value;

            $scope.channelType = types[type];
            console.log($scope.channelType);

            $scope.channelPath = channel.settings[1]._value;
        };

    }]);
})