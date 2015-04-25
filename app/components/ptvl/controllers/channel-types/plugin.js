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

        $scope.backup = {};
        $scope.plugin ={};

        var chSorts = ruleFactory.getSort($scope.channel.rules.main[4]);
        $scope.sorts = chSorts[0];
        $scope.sort = {};

        var chLimits = ruleFactory.getLimit($scope.channel.rules.main[3]);
        $scope.limits = chLimits[0];
        $scope.limit = {};

        // Get the length of the plugin path (to see if there are subfolders).  cpsf is "Count plugin sub folder"
        var cpsf = $scope.channel.rules.main[1].split("/").length;

        // If there are SubFolders "plugin://plugin.video.*/*"
        if (cpsf > 3)
        {
            var myRegexp = /(plugin.video.*?\/)/g;
            var channelplugin = myRegexp.exec($scope.channel.rules.main[1]);
            channelplugin = channelplugin[1].substring(0, channelplugin[1].length -1);
            var subfolders = $scope.channel.rules.main[1].split("/").splice(3, cpsf);
            var pluginPath = "plugin://" + channelplugin + "/" + subfolders.join("/");
            var subPath = subfolders.join("/");



            $scope.channel.plugin =
            {
                addonid: channelplugin,
                subfolder: subfolders,
                subpath: subPath,
                path: pluginPath,
                sort: chSorts[1],
                limit: chLimits[1]
            };
            console.log("Plugin has subfolders: ",$scope.channel);
        }
        // If there aren't any SubFolders "plugin://plugin.video.*"
        else
        {
            myRegexp = /(plugin.video.*)/g;
            channelplugin = myRegexp.exec($scope.channel.rules.main[1]);
            channelplugin = channelplugin[1].substring(0, channelplugin[1].length);
            pluginPath = "plugin://" + channelplugin;

            $scope.channel.plugin =
            {
                addonid: channelplugin,
                path: pluginPath,
                sort: chSorts[1],
                limit: chLimits[1]
            };
            console.log("Plugin has no subfolders: ",$scope.channel);
        }

        $scope.subfolders = $scope.channel.plugin.subpath;

        $scope.selectPlugin = function (channel, plugin)
        {

            $scope.backup.plugin = channel.plugin;
            $scope.changed.value = true;
            $scope.changed.plugin = true;
            console.log(channel, plugin);
            channel.plugin = {};
            channel.plugin.sort = $scope.backup.plugin.sort;
            channel.plugin.limit = $scope.backup.plugin.limit;
            channel.plugin.addonid = plugin.addonid;
            $scope.subfolders = '';
        };

        $scope.undoPlugin = function (channel)
        {
            var r = confirm("Are you sure you want to undo changing the plugin?");
            if(r == true) {
                channel.plugin = {};
                console.log($scope.backup.plugin);
                channel.plugin = jQuery.extend(true, {}, $scope.backup.plugin);
                console.log(channel.plugin);
                $scope.plugin.selected = channel.plugin;
                $scope.subfolders = channel.plugin.subpath;
                $scope.changed.plugin = false;
                $scope.changed.subfolders = false;
            }
            else
            {
                $scope.changed.plugin = true;
                $scope.changed.subfolders = true;
            }

        };

        $scope.backupSubs = function (channel)
        {
            $scope.changed.subfolders = true;
            $scope.changed.value = true;
            console.log(channel);
            $scope.backup.subfolders = channel.plugin.subpath;
            console.log('Subfolder path was backed up as: ', $scope.backup.subfolders);
        };

        $scope.undoSub = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin subfolder path?");
            if(r == true) {
                $scope.subfolders = $scope.backup.subfolders;
            }
        };

        $scope.selectLimit = function (channel, limit)
        {
            $scope.changed.limit = true;
            $scope.changed.value = true;
            $scope.backup.limit = channel.plugin.limit;
            channel.plugin.limit = limit;
            console.log(channel);
        };

        $scope.undoLimit = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin sort?");
            if(r == true) {
                $scope.changed.limit = false;
                $scope.changed.value = false;
                $scope.limit.selected = $scope.backup.limit;
            }
        };

        $scope.selectSort = function (channel, sort)
        {
            $scope.changed.sort = true;
            $scope.changed.value = true;
            $scope.backup.sort = channel.plugin.sort;
            channel.plugin.sort = sort;
            console.log(channel);
        };

        $scope.undoSort = function ()
        {
            var r = confirm("Are you sure you want to undo changing the plugin sort?");
            if(r == true) {
                $scope.changed.sort = false;
                $scope.changed.value = false;
                $scope.sort.selected = $scope.backup.sort;
            }
        };

        $scope.save = function (channel, subfolders)
        {

            channel.plugin.subpath = subfolders;
            channel.rules.main[1] = 'plugin://'+channel.plugin.addonid+'/'+channel.plugin.subpath;
            channel.rules.main[3] = channel.plugin.limit.value;
            channel.rules.main[4] = channel.plugin.sort.value;
            console.log(channel);
            for ( var key in $scope.changed ) {
                $scope.changed[key] = false;
            }
        };

    }]);
});