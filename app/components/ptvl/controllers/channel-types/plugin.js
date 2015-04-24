define(['.././ptvl'], function (ptvlControllers) {
    'use strict';

    function getLimit(limit, limits) {
        for(var i=0; i<limit.length; i++) {
            if(limits[i].value === parseInt(limit))
            {
                return limits[i];
            }
        }
    }

    ptvlControllers.controller('pluginDetailsCtrl', ['$scope', 'pluginList', 'lockFactory' , function ($scope, pluginList, lockFactory) {

        pluginList.async().then(function (d) {
            $scope.plugins = d;
        });

        $scope.changed =
        {
            value: false,
            subfolders: false,
            plugin: false
        };

        $scope.plugin ={};

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
                sort: $scope.sortOrder[$scope.channel.rules.main[4]],
                limit: getLimit($scope.channel.rules.main[3], $scope.feedLimit)
            };
            console.log("Plugin has subfolders: ",$scope.channel);
        }
        // If there aren't any SubFolders "plugin://plugin.video.*"
        else
        {
            var myRegexp = /(plugin.video.*)/g;
            channelplugin = myRegexp.exec($scope.channel.rules.main[1]);
            channelplugin = channelplugin[1].substring(0, channelplugin[1].length);
            pluginPath = "plugin://" + channelplugin;

            $scope.channel.plugin =
            {
                addonid: channelplugin,
                path: pluginPath,
                sort: $scope.sortOrder[$scope.channel.rules.main[4]],
                limit: getLimit($scope.channel.rules.main[3], $scope.feedLimit)
            };
            console.log("Plugin has no subfolders: ",$scope.channel);
        }

        $scope.subfolders = $scope.channel.plugin.subpath;

        $scope.backup = jQuery.extend(true, {}, $scope.channel);
        console.log('Channel backed up as plugin type here: ',$scope.backup);

        $scope.selectPlugin = function (channel, plugin)
        {
            $scope.changed.value = true;
            $scope.changed.plugin = true;
            console.log(channel, plugin);
            $scope.backup.plugin = jQuery.extend(true, {}, channel.plugin);
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
            channel.plugin.limit = limit;

            channel.rules.main[3] = limit.limit;

            console.log($scope.backup);
            console.log(channel);
        };

        $scope.save = function (channel, subfolders)
        {
            channel.plugin.subpath = subfolders;
            channel.rules.main[1] = 'plugin://'+channel.plugin.addonid+'/'+channel.plugin.subpath;
            console.log(channel);
            for ( var key in $scope.changed ) {
                $scope.changed[key] = false;
            }
        };

    }]);
});