define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    function chType(type, types) {
        for(var i=0; i<types.length; i++) {
            if(types[i].value === parseInt(type))
            {
             return types[i];
            }
        }
    }

    ptvlControllers.controller('channelDetailsCtrl', ['$scope', 'lockFactory', function ($scope, lockFactory) {

        var channelLocked =
        {
            channel: $scope.channel.channel,
            locked: true
        };

        lockFactory.addLock(channelLocked);

        $scope.channel.locked = lockFactory.getLocked($scope.channel.channel);

        $scope.channelLocked = 'Unlock';

        $scope.type = {};

        $scope.backup = {};

        $scope.types = [
            {type: 'Playlist',                  value: 0,   templateUrl: '/app/components/ptvl/templates/channel-types/playlist.html'},
            {type: 'TV Network',                value: 1,   templateUrl: '/app/components/ptvl/templates/channel-types/playlist.html'},
            {type: 'Movie Studio',              value: 2},
            {type: 'TV Genre',                  value: 3},
            {type: 'Movie Genre',               value: 4},
            {type: 'Mixed Genre (TV & Movie)',  value: 5},
            {type: 'TV Show',                   value: 6},
            {type: 'Directory',                 value: 7,   templateUrl: '/app/components/ptvl/templates/channel-types/directory.html'},
            {type: 'LiveTV',                    value: 8},
            {type: 'InternetTV',                value: 9},
            {type: 'YoutubeTV',                 value: 10,  templateUrl: '/app/components/ptvl/templates/channel-types/youtube.html'},
            {type: 'RSS',                       value: 11,  templateUrl: '/app/components/ptvl/templates/channel-types/rss.html'},
            {type: 'Music',                     value: 12},
            {type: 'Music Videos',              value: 13},
            {type: 'Extras',                    value: 14},
            {type: 'Plugin',                    value: 15,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'},
            {type: 'Playon',                    value: 16},
            {type: 'Global Settings',           value: 99,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'}
        ];

        $scope.channel.type = chType($scope.channel.type, $scope.types);

        // When a new type is selected, update the channel
        $scope.selectType = function (channel, type) {
            $scope.backup.type = channel.type;
            console.log('Channel type was backup up as: ',$scope.backup.type);
            channel.type = chType(type.value, $scope.types);
            console.log('Channel type was changed to: ',channel.type);
        };


        $scope.undo = function (channel){
            var r = confirm("Are you sure you want to undo changes?");
            if(r == true) {
                channel.type = $scope.backup.type;
                console.log(channel.type);
                $scope.type.selected = channel.type;
            }
            return channel;
        };

        $scope.commit = function (channel){
            var r = confirm("Are you sure you want to commit channel:"+ channel.channel + " changes?");
            if(r == true) {
                $scope.channel.locked = lockFactory.toggleLock($scope.channel.channel);
                $scope.channelLocked = 'Unlock';
                $scope.channel = channel;
                $scope.channel.changed = "True";
                console.log($scope.channels);

            }
            return channel;
        };

        $scope.lock = function (channel)
        {
            if($scope.channel.locked)
            {
                console.log($scope.channel.locked);
                var r = confirm("Are you sure you want to "+$scope.channelLocked.toLowerCase()+" channel "+ channel.channel +"?");
                if(r == true) {
                    $scope.channelLocked = 'Lock';
                    $scope.channel.locked = lockFactory.toggleLock($scope.channel.channel);
                }
            }
            else if(!$scope.channel.locked)
            {
                var r = confirm("Are you sure you want to "+$scope.channelLocked.toLowerCase()+" channel "+ channel.channel);
                if(r == true) {
                    $scope.channelLocked = 'Unlock';
                    $scope.channel.locked = lockFactory.toggleLock($scope.channel.channel);
                }
            }
        }

    }]);
});