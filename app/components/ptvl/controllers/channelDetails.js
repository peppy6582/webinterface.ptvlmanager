define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    ptvlControllers.controller('channelDetailsCtrl', ['$scope', 'lockFactory', 'ruleFactory', function ($scope, lockFactory, ruleFactory) {

        var channelLocked =
        {
            channel: $scope.channel.channel,
            locked: true
        };

        lockFactory.addLock(channelLocked);

        $scope.channel.locked = lockFactory.getLocked($scope.channel.channel);


        $scope.channelLocked = 'Unlock';

        $scope.types = ruleFactory.getTypes();

        $scope.type = {};

        $scope.changed =
        {
            plugin: false
        };

        $scope.backup = {};

        $scope.channel.type = ruleFactory.getType($scope.channel.type);

        // When a new type is selected, update the channel
        $scope.selectType = function (channel, type) {
            $scope.backup.type = channel.type;
            $scope.changed.plugin = true;
            console.log('Channel type was backup up as: ',$scope.backup.type);
            channel.type = ruleFactory.getType(type.value);
            console.log('Channel type was changed to: ',channel.type);
        };


        $scope.undo = function (channel){
            var r = confirm("Are you sure you want to undo plugin changes?");
            if(r == true) {
                $scope.changed.plugin = false;
                channel.type = $scope.backup.type;
                console.log(channel.type);
                $scope.type.selected = channel.type;
            }
            return channel;
        };

        $scope.commit = function (channel){
            var r = confirm("Are you sure you want to commit channel "+ channel.channel + " changes?");
            if(r == true) {
                alert("Make sure to actually download your new settings2.xml at the bottom!");
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