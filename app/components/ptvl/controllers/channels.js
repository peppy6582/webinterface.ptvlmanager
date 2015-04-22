define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    String.prototype.contains = function (str) {
        return this.indexOf(str) != -1;
    };

    Array.max = function ( array ) {
        return Math.max.apply( Math, array );
    };

    function cleanArray(actual){
        var newArray = new Array();
        for(var i = 0; i<actual.length; i++){
            if (actual[i]){
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    ptvlControllers.controller('channelCtrl', ['$scope', '$http', 'settingsList', 'pluginList', function ($scope, $http, settingsList, pluginList) {

        $scope.sortableOptions = {
            handle: ' .handle',
            update: function(e, ui) {
                if (ui.item.sortable.model == "can't be moved")
                {
                    ui.item.sortable.cancel();
                    alert('You cannot move that one here');
                }
                else
                {
                    ui.item.sortable.model.channel = ui.item.sortable.dropindex;
                }
            }
            // items: ' .panel:not(.panel-heading)'
            // axis: 'y'
        };

        $scope.channels = [];
        $scope.loadingChannels = [];

        settingsList.async().then(function (d) {
            $scope.settings = d;
        });

        $scope.showContent = function ($fileContent) {

            function replaceSpecial (file) {
                var find = '&';
                var re = new RegExp(find, 'g');
                file = file.replace(re, '&amp;');
                return file;
            }

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
                        $scope.channelNumbers.push(id.split('_')[1]);

                        var channelNum = parseInt(id.split('_')[1]);
                        var idNo = parseInt(id.split('_')[2]);

                        // If the channel doesn't exist, create it
                        if (typeof $scope.channels[channelNum] === 'undefined') {

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


        $scope.CreateXMLDoc = function () {

            $scope.newChannels = $scope.channels;

            console.log($scope.newChannels);

            if (document.implementation.createDocument &&
                document.implementation.createDocumentType)
            {
                var xmlDoc = document.implementation.createDocument ("", "settings");

                var i = 1;

                var q = Array.max( $scope.channelNumbers );

                q = q + 2;

                console.log('This is the channel count: ' + q);

                while (i <= q) {
                    if(typeof $scope.newChannels[i] != 'undefined') {

                        // Channel Type
                        var typeNode = xmlDoc.createElement("setting");
                        typeNode.setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_type");
                        typeNode.setAttribute("value", $scope.newChannels[i].type);
                        xmlDoc.documentElement.appendChild(typeNode);

                        // Main Rules
                        if(typeof $scope.newChannels[i].rules.main != 'undefined') {

                            // mrcst = MainRuleCountStart
                            var mrcst = 1;
                            for(mrcst in $scope.newChannels[i].rules.main) {
                                if ($scope.newChannels[i].rules.main.hasOwnProperty(mrcst))
                                {
                                    console.log('This is the main rule I am working on: ', $scope.newChannels[i].rules.main[mrcst]);
                                    var mainRuleNode = [];
                                    mainRuleNode[mrcst] = xmlDoc.createElement("setting");
                                    mainRuleNode[mrcst].setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_"+mrcst);
                                    mainRuleNode[mrcst].setAttribute("value", $scope.newChannels[i].rules.main[mrcst]);
                                    xmlDoc.documentElement.appendChild(mainRuleNode[mrcst]);
                                    ++mrcst;
                                }
                            }
                        }
                        else
                        {
                            console.log("We didn't find any main rule here: ", $scope.newChannels[i].rules);
                        }

                        // Rule Count
                        if(typeof $scope.newChannels[i].rules.count != 'undefined') {
                            var ruleCountNode = xmlDoc.createElement("setting");
                            ruleCountNode.setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_rulecount");
                            ruleCountNode.setAttribute("value", $scope.newChannels[i].rules.count);
                            xmlDoc.documentElement.appendChild(ruleCountNode);
                        }

                        // Sub Rules
                        if(typeof $scope.newChannels[i].rules.sub != 'undefined') {

                            // srcst = SubRuleCountStart
                            var srcst = 1;
                            for (srcst in $scope.newChannels[i].rules.sub) {
                                if ($scope.newChannels[i].rules.sub.hasOwnProperty(srcst))
                                {
                                    console.log('This is the sub rule I am working on: ', $scope.newChannels[i].rules.sub[srcst]);
                                    var subRuleNode = [];
                                    subRuleNode[srcst] = xmlDoc.createElement("setting");
                                    subRuleNode[srcst].setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_rule_"+ srcst +"_id");
                                    subRuleNode[srcst].setAttribute("value", $scope.newChannels[i].rules.sub[srcst].id);
                                    xmlDoc.documentElement.appendChild(subRuleNode[srcst]);

                                    // sroptcst = SubRuleOptionsCountStart
                                    var sroptcst = 1;
                                    for (sroptcst in $scope.newChannels[i].rules.sub[srcst].options) {
                                        if ($scope.newChannels[i].rules.sub[srcst].options.hasOwnProperty(sroptcst))
                                        {
                                            console.log('This sub rule has options!');
                                            var subRuleOptNode = [];
                                            subRuleOptNode[sroptcst] = xmlDoc.createElement("setting");
                                            subRuleOptNode[sroptcst].setAttribute("id", "Channel_" + $scope.newChannels[i].channel + "_rule_" + $scope.newChannels[i].rules.sub[srcst].id + "_opt_" + sroptcst);
                                            subRuleOptNode[sroptcst].setAttribute("value", $scope.newChannels[i].rules.sub[srcst].options[sroptcst]);
                                            xmlDoc.documentElement.appendChild(subRuleOptNode[sroptcst]);

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

                        // Channel has been changed
                        if(typeof $scope.newChannels[i].changed != 'undefined') {
                            var changedNode = xmlDoc.createElement("setting");
                            changedNode.setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_changed");
                            changedNode.setAttribute("value", $scope.newChannels[i].changed);
                            xmlDoc.documentElement.appendChild(changedNode);
                        }

                        // Channel Time
                        if(typeof $scope.newChannels[i].time != 'undefined') {
                            var timeNode = xmlDoc.createElement("setting");
                            timeNode.setAttribute("id", "Channel_"+$scope.newChannels[i].channel+"_time");
                            timeNode.setAttribute("value", $scope.newChannels[i].time);
                            xmlDoc.documentElement.appendChild(timeNode);
                        }

                    }
                    i = i + 1;
                }

                // Global application settings
                if(typeof $scope.newChannels[0] !='undefined') {

                    // Last Exit Time
                    if(typeof $scope.newChannels[0].settings.LastExitTime != 'undefined') {
                        console.log('Last Exit Time was: ' + $scope.newChannels[0].settings.LastExitTime);
                        var lastExitNode = xmlDoc.createElement("setting");
                        lastExitNode.setAttribute("id", "LastExitTime");
                        lastExitNode.setAttribute("value", $scope.newChannels[0].settings.LastExitTime);
                        xmlDoc.documentElement.appendChild(lastExitNode);
                    }

                    // Last Reset Time
                    if(typeof $scope.newChannels[0].settings.LastResetTime != 'undefined') {
                        console.log('Last Reset Time was: ' + $scope.newChannels[0].settings.LastResetTime);
                        var lastResetNode = xmlDoc.createElement("setting");
                        lastResetNode.setAttribute("id", "LastResetTime");
                        lastResetNode.setAttribute("value", $scope.newChannels[0].settings.LastResetTime);
                        xmlDoc.documentElement.appendChild(lastResetNode);
                    }

                    // Force Channel Reset
                    if(typeof $scope.newChannels[0].settings.ForceChannelReset != 'undefined') {
                        console.log('Force Channel Reset: ' + $scope.newChannels[0].settings.ForceChannelReset);
                        var channelResetNode = xmlDoc.createElement("setting");
                        channelResetNode.setAttribute("id", "ForceChannelReset");
                        channelResetNode.setAttribute("value", $scope.newChannels[0].settings.ForceChannelReset);
                        xmlDoc.documentElement.appendChild(channelResetNode);
                    }

                }

                var serializer = new XMLSerializer();
                alert (serializer.serializeToString (xmlDoc));
                console.log(xmlDoc);

                var blob = new Blob([serializer.serializeToString (xmlDoc)], {type: "text/xml"});
                saveAs(blob, "settings2.xml")

            }
            else {
                alert ("Your browser does not support this example");
            }
        };

    }]);
});