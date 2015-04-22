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

    ptvlControllers.controller('channelDetailsCtrl', ['$scope', 'pluginList', function ($scope, pluginList) {

        pluginList.async().then(function (d) {
            $scope.plugins = d;
        });

        $scope.type = {};

        $scope.backup = [];

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

        console.log($scope.channel);
        $scope.channel.type = chType($scope.channel.type, $scope.types);
        console.log($scope.channel.type);

        $scope.sortOrder = [
            {order: 'Default',  value: 0},
            {order: 'Random',   value: 1},
            {order: 'Reverse',  value: 2}
        ];

        $scope.feedLimit = [
            {limit: '25',   value: 25},
            {limit: '50',   value: 50},
            {limit: '100',  value: 100},
            {limit: '150',  value: 150},
            {limit: '200',  value: 200},
            {limit: '250',  value: 250},
            {limit: '500',  value: 500},
            {limit: '1000', value: 1000}
        ];


        if (parseInt($scope.channel.type.value) == 10) {

            $scope.ytTypes = [
                {type: 'Channel/User', value: 1},
                {type: 'Playlist', value: 2},
                {type: 'New Subs', value: 3},
                {type: 'Favorites', value: 4},
                {type: 'Search (Safe)', value: 5},
                {type: 'Blank', value: 6},
                {type: 'Multi Playlist', value: 7},
                {type: 'Multi Channel', value: 8},
                {type: 'Raw (Gdata)', value: 9}
            ];

            $scope.channel.type.yt = $scope.ytTypes[$scope.channel.rules.main[2]];
            console.log($scope.channel);
        }

        $scope.onSelect = function (channel, type) {
            console.log(type);
            $scope.backup.type = channel.type;
            console.log('Channel type was backup up as: ',$scope.backup.type);
            channel.type = chType(type.value, $scope.types);
            console.log(channel.type);
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





    }]);
});