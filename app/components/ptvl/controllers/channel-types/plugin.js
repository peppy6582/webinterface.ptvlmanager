define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('pluginDetailsCtrl', ['$scope', 'pluginList', 'ruleFactory', function ($scope, pluginList, ruleFactory) {

        pluginList.async().then(function (d) {
            $scope.plugins = d;
        });

        $scope.changed =
        {
            value: false,
            subfolders: false,
            plugin: false,
            sort: false,
            limit: false
        };

        $scope.changes = {};

        $scope.plugin ={};

        var chSorts = ruleFactory.getSort($scope.channel.rules.main[4]);
        $scope.sorts = chSorts[0];
        $scope.sort = chSorts[1];

        var chLimits = ruleFactory.getLimit($scope.channel.rules.main[3]);
        $scope.limits = chLimits[0];
        $scope.limit = chLimits[1];

        $scope.channel = ruleFactory.getPluginParts($scope.channel);
        console.log($scope.channel);

        $scope.plugin.addonid = $scope.channel.plugin.addonid;
        $scope.subfolders = $scope.channel.plugin.subfolders;

        $scope.selectPlugin = function (plugin)
        {
            if($scope.plugin.addonid !== plugin.addonid)
            {
                $scope.changed.plugin = true;
                $scope.changes.addonid = plugin.addonid;
                $scope.subfolders = '';
                console.log('Addonid changed to '+$scope.changes.addonid+', but not yet applied!')
            }
            else
            {
                $scope.changed.plugin = false;
                $scope.subfolders = $scope.channel.plugin.subfolders;
            }
        };

        $scope.undoPlugin = function (channel)
        {
            var r = confirm("Are you sure you want to undo changing the plugin?");
            if(r == true) {
                $scope.changed.plugin = false;
                $scope.plugin.selected = $scope.plugin;
                $scope.subfolders = $scope.channel.plugin.subfolders;
            }
            else
            {
                $scope.changed.plugin = true;
                $scope.changed.subfolders = true;
            }

        };

        $scope.changedSubs = function ()
        {
            $scope.changed.subfolders = true;
            $scope.changed.value = true;
        };

        $scope.undoSub = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin subfolder path?");
            if(r == true) {
                $scope.subfolders = $scope.channel.plugin.subfolders;
            }
            else {
                $scope.subfolders = '';
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

        $scope.save = function (channel, subfolders)
        {
            channel.plugin.subpath = subfolders;
            channel.rules.main[1] = 'plugin://'+channel.plugin.addonid+'/'+channel.plugin.subpath;
            channel.rules.main[3] = $scope.changes.limit;
            channel.rules.main[4] = $scope.changes.sort;
            console.log(channel);
            for ( var key in $scope.changed ) {
                $scope.changed[key] = false;
            }
        };

    }]);
});