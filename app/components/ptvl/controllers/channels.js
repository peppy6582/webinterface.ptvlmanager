define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    String.prototype.contains = function (str) {
        return this.indexOf(str) != -1;
    };

    function replaceSpecial (file) {
        var find = '&';
        var re = new RegExp(find, 'g');
        file = file.replace(re, '&amp;');
        return file;
    }

    function writeToFile(string){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var fh = fso.OpenTextFile("settings.xml", 8, false, 0);
        fh.WriteLine(string);
        fh.Close();
    }

    function cleanArray(actual){
        var newArray = new Array();
        for(var i = 0; i<actual.length; i++){
            if (actual[i]){
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    ptvlControllers.controller('channelCtrl', ['$scope', '$state', '$http', 'settingsList', 'ruleFactory', function ($scope, $state, $http, settingsList, ruleFactory) {

        $scope.channels = [];
        $scope.loadingChannels = [];

        $scope.oneAtATime = true;

        settingsList.async().then(function (d) {
            $scope.settings = d;
        });

        $scope.showContent = function ($fileContent) {

            $scope.settingsFile = replaceSpecial($fileContent);
            var x2js = new X2JS();
            $scope.loadingChannels = x2js.xml_str2json($scope.settingsFile);

            $scope.channelNumbers = [];

            for(var i = 0; i<$scope.loadingChannels.settings.setting.length; i++) {
                if (typeof $scope.loadingChannels.settings.setting[i] != 'undefined') {

                    var id = $scope.loadingChannels.settings.setting[i]._id;
                    var value = $scope.loadingChannels.settings.setting[i]._value;

                    // If the setting ID is NOT a number, it is a Global Setting, so send it to Channel '0'
                    if (isNaN(id.split('_')[1])) {

                        if (typeof $scope.channels[0] === 'undefined') {
                            $scope.channels[0] =
                            {
                                'channel': 'Global Settings'

                            };
                            $scope.channels[0].settings = {};
                            $scope.channels[0].type = "99";

                        }
                        $scope.channels[0].settings[id] = value;

                    }

                    // If the setting ID IS a number, send it to a real channel object
                    else {


                        var channelNum = parseInt(id.split('_')[1]);
                        var idNo = parseInt(id.split('_')[2]);

                        // If the channel doesn't exist, create it
                        if (typeof $scope.channels[channelNum] === 'undefined') {

                            $scope.channelNumbers.push(id.split('_')[1]);

                            $scope.channels[channelNum] =
                            {
                                'channel': channelNum,
                                'rules': {
                                    'count': '',
                                    'main': {},
                                    'sub': {}
                                }
                            }
                        }

                        // If the setting id contains 'rulecount', assume this is how many rules the channel has
                        if (id.contains('rulecount')) {
                            $scope.channels[channelNum].rules.count = parseInt(value);
                        }

                        // If the setting id looks like Channel_#_#, assume this is a MAIN rule for the channel
                        else if (idNo === parseInt(idNo, 10)) {

                            $scope.channels[channelNum].rules.main[idNo] = value;

                        }

                        // If the setting id looks like Channel_#_rule_#_id, create an object for that sub rule
                        else if (id.contains('rule_') && id.contains('id')) {

                            var rule_id = id.split('_');

                            var rule_number = rule_id[3];

                            $scope.channels[channelNum].rules.sub[rule_number] =
                            {
                                'id': value,
                                'options': {}
                            };

                        }

                        // If the setting id has opt in it, add it as an option to the sub rule
                        else if (id.contains('opt')) {

                            var rule_id = id.split('_');

                            var rule_number = rule_id[3];

                            var option = rule_id[5];

                            $scope.channels[channelNum].rules.sub[rule_number].options[option] = value;


                        }

                        // If the setting id has type in it, set that as the channel type
                        else if (id.contains('type')) {
                            $scope.channels[channelNum].type = value;
                        }

                        // If the setting id has time in it, set that as the channel time
                        else if (id.contains('time')) {
                            $scope.channels[channelNum].time = value;
                        }

                        // If the setting id has changed in it, add to the channel as True
                        else if (id.contains('changed')) {
                            $scope.channels[channelNum].changed = value;
                        }

                        // If the setting id has SetResetTime in it, add it to the channel as reset_time
                        else if (id.split('_')[2].length === 12) {
                            console.log('This channel has a set reset time: ', $scope.channels[channelNum]);
                            $scope.channels[channelNum].reset = value;
                        }

                        // If the setting id has not been defined, add it to settings
                        else {

                            var settings =
                            {
                                'id': id,
                                'value': value
                            };

                            console.log('These are undefined settings: ', settings);

                            $scope.channels[channelNum].settings[id] = settings;
                        }
                    }

                }
            }

            $scope.channelDetails = { isOpen: true };
            $scope.channelsLoaded = true;
            $scope.channels = cleanArray($scope.channels);
            console.log($scope.channels);
        };

        $scope.clearChannels = function()
        {
            if($scope.channels != 'undefined') {
                var r = confirm("Are you sure you want to load new channels?");
                if(r == true) {
                    $state.reload();
                }
            }
        };

        $scope.saveSettings = function () {
            var textToWrite = '<settings>';

            var settings = [];

            settings.push(textToWrite);

            $scope.newChannels = $scope.channels;
            console.log($scope.newChannels);

            var i = 0;

            var q = $scope.channelNumbers.length;

            console.log('This is the channel count: ' + q);

            while (i <= q) {
                if (typeof $scope.newChannels[i] != 'undefined') {

                    // Channel Type
                    if (typeof $scope.newChannels[i].settings != 'undefined') {
                        console.log('There will be some global application settings passed into this file');
                    }
                    else
                    {
                        var type = '<setting id="Channel_'+$scope.newChannels[i].channel+'_type" value="'+$scope.newChannels[i].type.value+'" />';
                        console.log(type);
                        console.log($scope.newChannels[i]);
                        settings.push(type);
                    }

                    if (typeof $scope.newChannels[i].rules != 'undefined') {

                        // Main Rules
                        if(typeof $scope.newChannels[i].rules.main != 'undefined') {

                            // mrcst = MainRuleCountStart
                            var mrcst = 1;
                            for(mrcst in $scope.newChannels[i].rules.main) {
                                if ($scope.newChannels[i].rules.main.hasOwnProperty(mrcst))
                                {

                                    var mainRule = '<setting id="Channel_'+$scope.newChannels[i].channel+'_'+mrcst+'" '+ 'value="'+$scope.newChannels[i].rules.main[mrcst]+'" />';
                                    console.log(mainRule);
                                    settings.push(mainRule);
                                    ++mrcst;
                                }
                            }
                        }

                        // Rule Count
                        if(typeof $scope.newChannels[i].rules.count != 'undefined') {

                            var ruleCount = '<setting id="Channel_'+$scope.newChannels[i].channel+'_rulecount" '+ 'value="'+$scope.newChannels[i].rules.count+'" />';
                            console.log(ruleCount);
                            settings.push(ruleCount);
                        }

                        // Sub Rules
                        if(typeof $scope.newChannels[i].rules.sub != 'undefined') {

                            // srcst = SubRuleCountStart
                            var srcst = 1;
                            for (srcst in $scope.newChannels[i].rules.sub) {
                                if ($scope.newChannels[i].rules.sub.hasOwnProperty(srcst))
                                {

                                    var subRule = '<setting id="Channel_'+$scope.newChannels[i].channel+'_rule_'+ srcst +'_id" '+ 'value="'+$scope.newChannels[i].rules.sub[srcst].id+'" />';
                                    console.log(subRule);
                                    settings.push(subRule);

                                    // sroptcst = SubRuleOptionsCountStart
                                    var sroptcst = 1;
                                    for (sroptcst in $scope.newChannels[i].rules.sub[srcst].options) {
                                        if ($scope.newChannels[i].rules.sub[srcst].options.hasOwnProperty(sroptcst))
                                        {
                                            var subRuleOpt = '<setting id="Channel_'+$scope.newChannels[i].channel+'_rule_'+srcst+'_opt_'+sroptcst+'" value="'+$scope.newChannels[i].rules.sub[srcst].options[sroptcst]+'" />';
                                            console.log(subRuleOpt);
                                            settings.push(subRuleOpt);
                                            console.log('This sub rule has options!');

                                            ++sroptcst;
                                        }
                                        else
                                        {
                                            console.log('This sub rule has no options');
                                        }
                                    }
                                    ++srcst;
                                }
                                else
                                {
                                    console.log('This channel has no sub rules');
                                }
                            }
                        }
                    }



                    // Channel has been changed
                    if(typeof $scope.newChannels[i].changed != 'undefined') {
                        var changed = '<setting id="Channel_'+$scope.newChannels[i].channel+'_changed" value="'+$scope.newChannels[i].changed+'" />';
                        console.log(changed);
                        settings.push(changed);
                    }

                    // Channel Time
                     if(typeof $scope.newChannels[i].time != 'undefined') {
                         var chTime = '<setting id="Channel_'+$scope.newChannels[i].channel+'_time" value="'+$scope.newChannels[i].time+'" />';
                         console.log(chTime);
                         settings.push(chTime);
                    }

                    // Set Reset Time
                    if(typeof $scope.newChannels[i].reset != 'undefined') {
                        var chTime = '<setting id="Channel_'+$scope.newChannels[i].channel+'_SetResetTime" value="'+$scope.newChannels[i].reset+'" />';
                        console.log(chTime);
                        settings.push(chTime);
                    }
                }
                i++;
            }

            // Global application settings
            if(typeof $scope.newChannels[0] !='undefined') {

                if(typeof $scope.newChannels[0].settings != 'undefined') {

                    // Last Exit Time
                    if(typeof $scope.newChannels[0].settings.LastExitTime != 'undefined') {
                        console.log('Last Exit Time was: ' + $scope.newChannels[0].settings.LastExitTime);
                        var lastExit = '<setting id="LastExitTime" value="'+$scope.newChannels[0].settings.LastExitTime+'" />';
                        settings.push(lastExit);
                    }

                    // Last Reset Time
                    if(typeof $scope.newChannels[0].settings.LastResetTime != 'undefined') {
                        console.log('Last Exit Time was: ' + $scope.newChannels[0].settings.LastResetTime);
                        var lastReset = '<setting id="LastResetTime" value="'+$scope.newChannels[0].settings.LastResetTime+'" />';
                        settings.push(lastReset);
                    }

                    // Force Channel Reset
                    if(typeof $scope.newChannels[0].settings.ForceChannelReset != 'undefined') {
                        console.log('Last Exit Time was: ' + $scope.newChannels[0].settings.ForceChannelReset);
                        var forceReset = '<setting id="ForceChannelReset" value="'+$scope.newChannels[0].settings.ForceChannelReset+'" />';
                        settings.push(forceReset);
                    }

                }

            }

            var settingsClose = '</settings>';

            settings.push(settingsClose);

            settings = settings.join('');

            var blob = new Blob([settings], {type: "text/plain"});


            saveAs(blob, "settings2.xml");
        };
    }]);
});