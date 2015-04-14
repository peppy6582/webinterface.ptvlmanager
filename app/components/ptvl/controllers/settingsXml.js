define(['./ptvl'], function (ptvlControllers) {
    'use strict';

    String.prototype.contains = function(str) { return this.indexOf(str) != -1; };

    ptvlControllers.controller('ptvlSettingsCtrl', ['$scope', 'settingsList', function($scope, settingsList) {

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
                        };
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
                        };


                    };
                    i = i + 1;
                });
            };
            console.log($scope.sortedChannels);
        };

        $scope.selectedType = {};

        $scope.getSettings = function(channel) {

            console.log(channel);

            $scope.types =[
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
                {   type: 'Unknown',                  value: 14 },
                {   type: 'Plugin',                   value: 15 }
        ];

            $scope.type = channel.Type;

            $scope.channelType = $scope.types[$scope.type];

        };

        $scope.changeType = function (newType) {
            console.log(newType);
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
                    console.log($scope.newChannels[i]);
                    if(typeof $scope.newChannels[i] != 'undefined') {
                        var typeNode = xmlDoc.createElement("setting");
                        typeNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_type");
                        typeNode.setAttribute("value", $scope.newChannels[i].Type);
                        xmlDoc.documentElement.appendChild(typeNode);
                        if(typeof $scope.newChannels[i].MainRules != 'undefined') {
                            var oneNode = xmlDoc.createElement("setting");
                            oneNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_1");
                            oneNode.setAttribute("value", $scope.newChannels[i].MainRules[1].value);
                            xmlDoc.documentElement.appendChild(oneNode);
                            if (typeof $scope.newChannels[i].MainRules[2] != 'undefined') {
                                var twoNode = xmlDoc.createElement("setting");
                                twoNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_2");
                                twoNode.setAttribute("value", $scope.newChannels[i].MainRules[2].value);
                                xmlDoc.documentElement.appendChild(twoNode);
                            };
                            if (typeof $scope.newChannels[i].MainRules[3] != 'undefined') {
                                var threeNode = xmlDoc.createElement("setting");
                                threeNode.setAttribute("id", "Channel_" + $scope.newChannels[i].Channel + "_3");
                                threeNode.setAttribute("value", $scope.newChannels[i].MainRules[3].value);
                                xmlDoc.documentElement.appendChild(threeNode);
                            };
                            if (typeof $scope.newChannels[i].MainRules[4] != 'undefined') {
                                var fourNode = xmlDoc.createElement("setting");
                                fourNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_4");
                                fourNode.setAttribute("value", $scope.newChannels[i].MainRules[4].value);
                                xmlDoc.documentElement.appendChild(fourNode);
                            };
                        };
                        if(typeof $scope.newChannels[i].RuleCount != 'undefined') {
                            var ruleCountNode = xmlDoc.createElement("setting");
                            ruleCountNode.setAttribute("id", "Channel_"+$scope.newChannels[i].Channel+"_rulecount");
                            ruleCountNode.setAttribute("value", $scope.newChannels[i].RuleCount);
                            xmlDoc.documentElement.appendChild(ruleCountNode);
                        }
                    };

                    i = i + 1;
                };

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