define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('youtubeDetailsCtrl', ['$scope', 'ruleFactory', function ($scope, ruleFactory) {

        $scope.changed =
        {
            value: false,
            path: false,
            YtType: false,
            sort: false,
            limit: false
        };

        $scope.changes = {};

        // Adds a YtType object for attaching the selection
        $scope.YtType = {};

        if($scope.channel.type != 10) {

        }
        else {

            // Returns all the YouTube channel types available at chYtTypes[0] as well as the channel's SPECIFIC type at chYtTypes[1]
            var chYtTypes = ruleFactory.getYtType($scope.channel.rules.main[2]);

            // Adds the YouTube channel types available to the scope, for the ui-select drop down
            $scope.YtTypes = chYtTypes[0];
            console.log('This is the YtType I found: ', chYtTypes[1]);
            console.log('For channel: ', $scope.channel);

            // Binds the specific type the channel uses to the YtType object
            $scope.YtType = chYtTypes[1];

            // Returns all the options for Sort at chSorts[0] as well as the channel's SPECIFIC sort at chSorts[1]
            var chSorts = ruleFactory.getSort($scope.channel.rules.main[4]);

            // Adds the Sort options available to the scope, for the ui-select drop down
            $scope.sorts = chSorts[0];

            // Adds a sort object for attaching the selection
            $scope.sort = chSorts[1];

            // Returns all the options for Limit at chLimits[0] as well as the channel's SPECIFIC limit at chLimits[1]
            var chLimits = ruleFactory.getLimit($scope.channel.rules.main[3]);

            // Adds the Limits options available to the scope, for the ui-select drop down
            $scope.limits = chLimits[0];

            // Adds a limit object for attaching the selection
            $scope.limit = chLimits[1];

            // Creates a value for mapping the YouTube type to the input label
            $scope.input = $scope.YtType.name;

            // Creates a value for mapping the path (Username, Playlist, etc.)
            $scope.path = $scope.channel.rules.main[1];

        }

        // When a YouTube type is selected, backup the old type, clear the old type, and set it to the selected one
        $scope.selectYtType = function (YtType)
        {
            if($scope.YtType.name !== YtType.name)
            {
                $scope.changed.YtType = true;
                $scope.changes.YtType = YtType.value;
                $scope.path = '';
                console.log('YouTube Type changed to '+YtType.name);
            }
            else
            {
                alert('We must have missed something!!');
            }
        };

        // Go back to the originally loaded type
        $scope.undoYtType = function ()
        {
            var r = confirm("Are you sure you want to undo changing the YouTube Type?");
            if(r == true) {
                $scope.changed.YtType = false;
                $scope.YtType.selected = $scope.YtType;
                $scope.path = $scope.channel.rules.main[1];
                $scope.input = $scope.YtType.name;
            }
        };

        $scope.selectSort = function (sort)
        {
            if(parseInt($scope.channel.rules.main[4]) !== sort.value) {
                $scope.changed.sort = true;
                $scope.changed.value = true;
                $scope.changes.sort = sort.value;
            }
            else {
                $scope.changed.sort = false;
                $scope.changed.value = false;
            }

        };

        $scope.undoSort = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin sort?");
            if(r == true) {
                $scope.changed.sort = false;
                $scope.changed.value = false;
                $scope.sort.selected = $scope.sort;
            }
        };

        $scope.selectLimit = function (limit)
        {
            if(parseInt($scope.channel.rules.main[3]) !== limit.value) {
                $scope.changed.limit = true;
                $scope.changed.value = true;
                $scope.changes.limit = limit.value;
            }
            else {
                $scope.changed.limit = false;
                $scope.changed.value = false;
            }

        };

        $scope.undoLimit = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin sort?");
            if(r == true) {
                $scope.changed.limit = false;
                $scope.changed.value = false;
                $scope.limit.selected = $scope.limit;
            }
        };

        $scope.changedPath = function ()
        {
            $scope.changed.path = true;
            $scope.changed.value = true;
        };

        $scope.saveYouTube = function (channel, path)
        {
            channel.rules.main[1] = path;

            if('limit' in $scope.changed) {
                channel.rules.main[3] = $scope.changes.limit;
            }

            if('sort' in $scope.changes) {
                channel.rules.main[4] = $scope.changes.sort;
            }

            for ( var key in $scope.changed ) {
                $scope.changed[key] = false;
            }
        };

    }]);
});