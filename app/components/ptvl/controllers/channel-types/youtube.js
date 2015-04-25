define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    function getLimit(limit, limits) {
        for (var i = 0; i < limit.length; i++) {
            if (limits[i].value === parseInt(limit)) {
                return limits[i];
            }
        }
    }

    ptvlControllers.controller('youtubeDetailsCtrl', ['$scope', 'ruleFactory', function ($scope, ruleFactory) {

        $scope.changed =
        {
            value: false,
            input: false,
            YtType: false,
            sort: false,
            limit: false
        };

        $scope.backup = {};
        $scope.backup.yt = {};
        console.log('Channel backed up as youtube type here: ',$scope.backup);

        // Adds a ytType object for attaching the selection
        $scope.ytType = {};

        // Returns all the YouTube channel types available at chYtTypes[0] as well as the channel's SPECIFIC type at chYtTypes[1]
        var chYtTypes = ruleFactory.getYtType($scope.channel.rules.main[2] -1);

        // Adds the YouTube channel types available to the scope, for the ui-select drop down
        $scope.YtTypes = chYtTypes[0];
        console.log('This is the YtType I found: ', chYtTypes[1]);

        // Returns all the options for Sort at chSorts[0] as well as the channel's SPECIFIC sort at chSorts[1]
        var chSorts = ruleFactory.getSort($scope.channel.rules.main[4]);

        // Adds the Sort options available to the scope, for the ui-select drop down
        $scope.sorts = chSorts[0];

        // Adds a sort object for attaching the selection
        $scope.sort = {};

        // Returns all the options for Limit at chLimits[0] as well as the channel's SPECIFIC limit at chLimits[1]
        var chLimits = ruleFactory.getLimit($scope.channel.rules.main[3]);

        // Adds the Limits options available to the scope, for the ui-select drop down
        $scope.limits = chLimits[0];

        // Adds a limit object for attaching the selection
        $scope.limit = {};

        // Adds a temporary object for working in this type scope
        $scope.channel.yt =
        {
            type: chYtTypes[1],
            path: $scope.channel.rules.main[1],
            sort: chSorts[1],
            limit: chLimits[1]
        };

        // Creates a value for mapping the YouTube type to the input label
        $scope.input = $scope.channel.yt.type.name;

        // Creates a value for mapping the path (Username, Playlist, etc.)
        $scope.path = $scope.channel.yt.path;

        // Backs up the path so it can be retrieved if you like
        $scope.backup.path = $scope.path;

        // When a YouTube type is selected, backup the old type, clear the old type, and set it to the selected one
        $scope.selectYtType = function (channel, ytType)
        {
            $scope.backup.yt.type = channel.yt.type;
            channel.yt.type = {};
            $scope.input = ytType.name;
            channel.yt.type = ytType;
        };

        // Go back to the originally loaded type
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