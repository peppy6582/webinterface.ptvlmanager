define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    String.prototype.contains = function(str) { return this.indexOf(str) != -1; };

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', 'pluginList', function($scope, settingsList, pluginList) {


        $scope.channelDetails =
        {
            isOpen: false
        };

        function channelCount(obj) {
            var result = 0;
            for(var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // or Object.prototype.hasOwnProperty.call(obj, prop)
                    result++;
                }
            }
            return result;
        }

        Array.max = function ( array ) {
            return Math.max.apply( Math, array );
        };


        $scope.OneAtATime = false;

        settingsList.async().then(function (d) {
            $scope.settings = d;

        });

        $scope.sortedChannels = {};

        $scope.showContent = function($fileContent){

            $scope.channels = [];
            $scope.sortedChannels = {};

            var replaceSpecial = function (file) {
                var find = '&';
                var re = new RegExp(find, 'g');
                file = file.replace(re, '&amp;');
                return file;
            };

            $scope.settingsFile = replaceSpecial($fileContent);
            var x2js = new X2JS();
            $scope.channels = x2js.xml_str2json($scope.settingsFile);

            console.log($scope.channels);

            var i = 0;

            var q = channelCount($scope.channels.settings.setting);

            q = q - 2;

            while (i <= q) {
                angular.forEach($scope.channels.settings.setting[i], function() {

                    $scope.channelNumbers = [];


                    var id = $scope.channels.settings.setting[i]._id;
                    var value = $scope.channels.settings.setting[i]._value;

                    var idNo = parseInt(id.split('_')[2]);

                    $scope.channelNumbers.push(id.split('_')[1]);

                    if(isNaN(id.split('_')[1])) {

                        var settings =
                            {
                                'id': id,
                                'value': value
                            };

                        if(typeof $scope.sortedChannels[0] === 'undefined') {
                            $scope.sortedChannels[0] =
                                {
                                    'Channel': 0
                                }
                            ;
                            $scope.sortedChannels[0].Settings = [];
                        }
                        $scope.sortedChannels[0].Settings.push(settings);

                    }
                    else
                    {

                        var channelNum = parseInt(id.split('_')[1]);

                        if(typeof $scope.sortedChannels[channelNum] === 'undefined') {

                            $scope.sortedChannels[channelNum] =
                            {
                                'Channel': channelNum
                            };
                            $scope.sortedChannels[channelNum].Settings = [];
                            $scope.sortedChannels[channelNum].MainRules = [];
                        }

                        if(id.contains('rulecount')) {
                            $scope.sortedChannels[channelNum].RuleCount = parseInt(value);
                        }
                        else if(id.contains('rule_')&& id.contains('id')) {

                        }
                        else if(idNo === parseInt(idNo, 10)) {

                            $scope.sortedChannels[channelNum].MainRules[idNo] =
                            {
                                'id': idNo,
                                'value': value
                            };

                        }
                        else if(id.contains('type')) {
                            $scope.sortedChannels[channelNum].Type = value;
                        }
                        else if(id.contains('time')) {
                            $scope.sortedChannels[channelNum].Time = value;
                        }
                        else if(id.contains('changed')) {
                            $scope.sortedChannels[channelNum].Changed = value;
                        }
                        else if(id.contains('SetResetTime')) {
                            $scope.sortedChannels[channelNum].SetResetTime= value;
                        }
                        else if(id.contains('opt')){
                            $scope.sortedChannels[channelNum].SubRules = [];
                            $scope.sortedChannels[channelNum].SubRules[id.split('_')[3]] =
                            {
                                'ruleNo': id.split('_')[3],
                                'value': value
                            };
                        }
                        else
                        {

                            var settings =
                            {
                                'id': id,
                                'value': value
                            };

                            $scope.sortedChannels[channelNum].Settings.push(settings);
                        }


                    };
                    i = i + 1;
                });
            };
            console.log($scope.sortedChannels);
            $scope.channelDetails = { isOpen: true };
        };

        $scope.selectedType = {};

        $scope.selectedYtType = {};

        $scope.selectedPlugin = {};

        $scope.getSettings = function(channel) {

            console.log(channel);

            $scope.types = [
                {   type: 'Playlist',                 value: 0 },
                {   type: 'TV Network',               value: 1 },
                {   type: 'Movie Studio',             value: 2 },
                {   type: 'TV Genre',                 value: 3 },
                {   type: 'Movie Genre',              value: 4 },
                {   type: 'Mixed Genre (TV & Movie)', value: 5 },
                {   type: 'TV Show',                  value: 6 },
                {   type: 'Directory',                value: 7 },
                {   type: 'LiveTV',                   value: 8 },
                {   type: 'InternetTV',               value: 9 },
                {   type: 'YoutubeTV',                value: 10 },
                {   type: 'RSS',                      value: 11 },
                {   type: 'Music',                    value: 12 },
                {   type: 'Music Videos',             value: 13 },
                {   type: 'Extras',                   value: 14 },
                {   type: 'Plugin',                   value: 15 },
                {   type: 'Playon',                   value: 16 }
            ];

            $scope.ytTypes = [
                {   type: 'Channel/User',             value: 1},
                {   type: 'Playlist',                 value: 2},
                {   type: 'New Subs',                 value: 3},
                {   type: 'Favorites',                value: 4},
                {   type: 'Search (Safe)',            value: 5},
                {   type: 'Blank',                    value: 6},
                {   type: 'Multi Playlist',           value: 7},
                {   type: 'Multi Channel',            value: 8},
                {   type: 'Raw (Gdata)',              value: 9}
            ];

            $scope.sortOrder = [
                {  order:'Default',                   value: 0 },
                {  order:'Random',                    value: 1 },
                {  order:'Reverse',                   value: 2 }
            ];

            $scope.feedLimit = [
                {  limit:'25',                        value: 25 },
                {  limit:'50',                        value: 50 },
                {  limit:'100',                       value: 100 },
                {  limit:'150',                       value: 150 },
                {  limit:'200',                       value: 200 },
                {  limit:'250',                       value: 250 },
                {  limit:'500',                       value: 500 },
                {  limit:'1000',                      value: 1000 }
            ];



            $scope.channelType = $scope.types[parseInt(channel.Type)];

            if (parseInt(channel.Type) == 10) {
                $scope.channelYtType = $scope.ytTypes[channel.MainRules[2].value];
            }
            else if (parseInt(channel.Type) == 15) {
                pluginList.async().then(function (d) {
                    $scope.plugins = d;
                });

                var myRegexp = /(plugin.video.*?\/)/g;
                $scope.channelPlugin = myRegexp.exec(channel.MainRules[1].value);
                $scope.channelPlugin = $scope.channelPlugin[1].substring(0, $scope.channelPlugin[1].length - 1);

                // Plugin SubFolder Count = cpsf
                var cpsf =  channel.MainRules[1].value.split("/").length;

                $scope.channelPluginSubFolders = channel.MainRules[1].value.split("/").splice(3, cpsf);
                $scope.channelPluginSubfolders = $scope.channelPluginSubFolders.join("/");
                console.log($scope.channelPluginSubFolders);
                $scope.channelPluginPath = "plugin://" + $scope.channelPlugin + "/" + $scope.channelPluginSubfolders;

            }
        };

        $scope.changeType = function (channel, newType) {
            channel.Type = newType.value;
            console.log(channel);
            return channel;
        };

        $scope.changeYtType = function (channel, newYtType) {
            channel.newYtType = newYtType;
            console.log(channel);
            return channel;
        };

        $scope.changePlugin = function (channel, newPlugin) {
            console.log(channel);
            console.log(newPlugin);
            return channel;
        };

        $scope.CreateXMLDoc = function () {

            $scope.newChannels = $scope.sortedChannels;

            console.log($scope.newChannels);

            if (document.implementation.createDocument &&
                document.implementation.createDocumentType)
            {
                var xmlDoc = document.implementation.createDocument ("", "settings");

                var i = 1;

                var q = Array.max( $scope.channelNumbers );

                q = q + 2;

                console.log(q);

                while (i <= q) {
                    if(typeof $scope.newChannels[i] != 'undefined') {
                        var typeNode = xmlDoc.createElement("setting");
                        typeNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_type");
                        typeNode.setAttribute("value", $scope.newChannels[i].Type);
                        xmlDoc.documentElement.appendChild(typeNode);
                        if(typeof $scope.newChannels[i].MainRules != 'undefined') {

                            // mrcst = MainRuleCountStart and mrcstp = MainRuleCountStop

                            var mrcstp = $scope.newChannels[i].MainRules.length -1;
                            var mrcst = 1;
                            while (mrcst <= mrcstp) {
                                console.log("Channel "+$scope.newChannels[i].Channel+" has processed "+mrcst+" Main Rules");
                                if (typeof $scope.newChannels[i].MainRules[mrcst] != 'undefined') {
                                    var mainRuleNode = [];
                                    mainRuleNode[mrcst] = xmlDoc.createElement("setting");
                                    mainRuleNode[mrcst].setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_"+mrcst);
                                    mainRuleNode[mrcst].setAttribute("value", $scope.newChannels[i].MainRules[mrcst].value);
                                    xmlDoc.documentElement.appendChild(mainRuleNode[mrcst]);
                                }
                                mrcst = mrcst +1;
                            }
                        }
                        if(typeof $scope.newChannels[i].RuleCount != 'undefined') {
                            var ruleCountNode = xmlDoc.createElement("setting");
                            ruleCountNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_rulecount");
                            ruleCountNode.setAttribute("value", $scope.newChannels[i].RuleCount);
                            xmlDoc.documentElement.appendChild(ruleCountNode);
                        }
                        if(typeof $scope.newChannels[i].SubRules != 'undefined') {

                            // srcst = SubRuleCountStart and srcstp = SubRuleCountStop

                            var srcstp = $scope.newChannels[i].SubRules.length -1;
                            var srcst = 1;
                            while (srcst <= srcstp) {
                                console.log("Channel "+$scope.newChannels[i].Channel+" has processed "+srcst+" Sub Rules");
                                if (typeof $scope.newChannels[i].SubRules[srcst] != 'undefined') {
                                    var subRuleNode = [];
                                    subRuleNode[srcst] = xmlDoc.createElement("setting");
                                    subRuleNode[srcst].setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_rule_"+$scope.newChannels[i].SubRules[srcst].ruleNo+"_id");
                                    subRuleNode[srcst].setAttribute("value", $scope.newChannels[i].MainRules[srcst].value);
                                    xmlDoc.documentElement.appendChild(subRuleNode[srcst]);
                                    var subRuleOptNode = [];
                                    subRuleOptNode[srcst] = xmlDoc.createElement("setting");
                                    subRuleOptNode[srcst].setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_rule_"+$scope.newChannels[i].SubRules[srcst].ruleNo+"_opt_"+$scope.newChannels[i].SubRules[srcst].ruleNo);
                                    subRuleOptNode[srcst].setAttribute("value", $scope.newChannels[i].SubRules[srcst].value);
                                    xmlDoc.documentElement.appendChild(subRuleOptNode[srcst]);
                                }
                                srcst = srcst +1;
                            }
                        }
                    }
                    i = i + 1;
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
})