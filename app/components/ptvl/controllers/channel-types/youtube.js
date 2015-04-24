define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    function getLimit(limit, limits) {
        for (var i = 0; i < limit.length; i++) {
            if (limits[i].value === parseInt(limit)) {
                return limits[i];
            }
        }
    }

    ptvlControllers.controller('youtubeDetailsCtrl', ['$scope', function ($scope) {

        $scope.saved = true;

        $scope.backup = {};
        $scope.backup.yt = {};
        console.log('Channel backed up as youtube type here: ',$scope.backup);

        $scope.ytType = {};

        $scope.ytTypes = [
            {name: 'Channel/User',      value: 1},
            {name: 'Playlist',          value: 2},
            {name: 'New Subs',          value: 3},
            {name: 'Favorites',         value: 4},
            {name: 'Search (Safe)',     value: 5},
            {name: 'Blank',             value: 6},
            {name: 'Multi Playlist',    value: 7},
            {name: 'Multi Channel',     value: 8},
            {name: 'Raw (Gdata)',       value: 9}
        ];

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

        $scope.channel.yt =
        {
            type: $scope.ytTypes[$scope.channel.rules.main[2] -1],
            path: $scope.channel.rules.main[1],
            sort: $scope.sortOrder[$scope.channel.rules.main[4]],
            limit: getLimit($scope.channel.rules.main[3], $scope.feedLimit)
        };

        $scope.input = $scope.channel.yt.type.name;
        $scope.path = $scope.channel.yt.path;
        $scope.backup.path = $scope.path;


        $scope.selectYtType = function (channel, ytType)
        {
            $scope.backup.yt.type = channel.yt.type;
            channel.yt.type = {};
            $scope.input = ytType.name;
            channel.yt.type = ytType;
        };

        $scope.undoYtType = function (channel)
        {
            var r = confirm("Are you sure you want to undo changing the YouTube Type?");
            if(r == true) {
                channel.yt.type = {};
                channel.yt.type = $scope.backup.yt.type;
                $scope.ytType.selected = channel.yt.type;
                $scope.input = channel.yt.type.name;
            }
        };

        $scope.backupPath = function (channel)
        {
            console.log(channel);
            $scope.saved = false;
            $scope.backup.path = channel.yt.path;
            console.log('Path was backed up as: ', $scope.backup.path);
        };

        $scope.savePath = function (channel, path)
        {
            channel.yt.path = path;
            $scope.saved = true;
            console.log('New path is: ', channel.yt.path);

        };

        $scope.selectLimit = function (channel, limit)
        {
            $scope.limit = {};
            $scope.limit.selected = limit;
            $scope.backup.yt.limit = channel.yt.limit;
            console.log('Limit was backed up as: ', $scope.backup.yt.limit);
            channel.yt.limit = limit;
            console.log('New limit is: ', channel.yt.limit);
            channel.rules.main[3] = limit.limit;
            console.log(channel);
        };

        console.log($scope.channel);

    }]);
});