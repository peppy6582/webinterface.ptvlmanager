define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.factory('ruleFactory', [function () {

        var types = [
            {type: 'Playlist (WIP-4/28)',                     value: 0,   templateUrl: '/app/components/ptvl/templates/channel-types/playlist.html'},
            {type: 'TV Network (WIP-4/28)',                   value: 1,   templateUrl: '/app/components/ptvl/templates/channel-types/tv-studio.html'},
            {type: 'Movie Studio (Not Started)',              value: 2},
            {type: 'TV Genre ((Not Started)',                 value: 3,   templateUrl: '/app/components/ptvl/templates/channel-types/tv-genre.html'},
            {type: 'Movie Genre (Not Started)',               value: 4},
            {type: 'Mixed Genre (Not Started)(TV & Movie)',   value: 5},
            {type: 'TV Show (Not Started)',                   value: 6},
            {type: 'Directory (Not Started)',                 value: 7,   templateUrl: '/app/components/ptvl/templates/channel-types/directory.html'},
            {type: 'LiveTV (Not Started)',                    value: 8},
            {type: 'InternetTV (Not Started)',                value: 9},
            {type: 'YoutubeTV',                               value: 10,  templateUrl: '/app/components/ptvl/templates/channel-types/youtube.html'},
            {type: 'RSS (Not Started)',                       value: 11,  templateUrl: '/app/components/ptvl/templates/channel-types/rss.html'},
            {type: 'Music (Not Started)',                     value: 12},
            {type: 'Music Videos (Not Started)',              value: 13},
            {type: 'Extras (Not Started)',                    value: 14},
            {type: 'Plugin',                                  value: 15,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'},
            {type: 'Playon (Not Started)',                    value: 16},
            {type: 'Global Settings (Not Started)',           value: 99,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'}
        ];

        var subRules = [
            {type: 'Nothing',                   id: 0,   status: false, value: {options: { 1: '' }}},
            {type: 'Name',                      id: 1,   status: false, value: {options: { 1: '' }}},
            {type: 'Shows not to Play',         id: 2,   status: false, value: {options: {}}},
            {type: 'Best Efforts Scheduling',   id: 3,   status: false, value: {options: {}}},
            {type: 'Only play watched',         id: 4,   status: false, value: '4'},
            {type: "Don't show this channel",   id: 5,   status: false, value: '5'},
            {type: 'Interleaved Shows',         id: 6,   status: false, value: {options: {}}},
            {type: 'Play Real-Time Mode',       id: 7,   status: false, value: '7'},
            {type: 'Pause when not watching',   id: 8,   status: false, value: '8'},
            {type: 'Play Resume Mode',          id: 9,   status: false, value: '9'},
            {type: 'Play Random',               id: 10,  status: false, value: '10'},
            {type: 'Play Only Unwatched',       id: 11,  status: false, value: '11'},
            {type: 'Play Shows in Order',       id: 12,  status: false, value: '12'},
            {type: 'Reset Every X Hours',       id: 13,  status: false, value: {options: { 1: {} }}},
            {type: 'Exclude Strms',             id: 14,  status: false, value: {options: { 1: 'No' }}},
            {type: 'Show Logo',                 id: 15,  status: false, value: {options: { 1: 'Yes' }}},
            {type: 'Nothing',                   id: 16,  status: false, value: {options: { 1: '' }}},
            {type: 'Exclude BCT',               id: 17,  status: false, value: {options: { 1: 'No' }}},
            {type: 'Disable Popup',             id: 18,  status: false, value: {options: { 1: 'No' }}}
        ];

        var limits = [
            {limit: '25',   value: 25},
            {limit: '50',   value: 50},
            {limit: '100',  value: 100},
            {limit: '150',  value: 150},
            {limit: '200',  value: 200},
            {limit: '250',  value: 250},
            {limit: '500',  value: 500},
            {limit: '1000', value: 1000}
        ];

        var sorts = [
            {order: 'Default',  value: 0},
            {order: 'Random',   value: 1},
            {order: 'Reverse',  value: 2}
        ];

        var YtTypes = [
            {name: 'None',              value: 0},
            {name: 'Channel/User',      value: 1},
            {name: 'Playlist',          value: 2},
            {name: 'New Subs',          value: 3},
            {name: 'Favorites',         value: 4},
            {name: 'Search (Safe)',     value: 5},
            {name: 'Blank',             value: 6},
            {name: 'Multi Playlist',    value: 7},
            {name: 'Multi Channel',     value: 8},
            {name: 'Raw (Gdata)',       value: 9}
        ];

        return {
            getType: function (value) {
                for(var i=0; i<types.length; i++) {
                    if(types[i].value === parseInt(value))
                    {
                        return types[i];
                    }
                }
            },
            getSubRules: function (rules) {
                var chSubRules = jQuery.extend({}, subRules);
                for(var s=1; s <= rules.count; s++) {
                    for(var i=0; i<subRules.length; i++) {
                        if (subRules[i].id === parseInt(rules.sub[s].id)) {
                            if (rules.sub[s].options !== 'undefined') {
                                subRules[i].value.options = rules.sub[s].options;
                            }
                            chSubRules[i] = jQuery.extend(true, {}, subRules[i]);
                            chSubRules[i].status = true;
                        }
                    }
                }
                console.log(chSubRules);
                return chSubRules;
            },
            getLimit: function (value) {
                console.log(value);
                for(var i=0; i<limits.length; i++) {
                    if(limits[i].value === parseInt(value))
                    {
                        var chLimits = [];
                        chLimits.push(limits);
                        chLimits.push(limits[i]);
                        console.log(limits[i]);
                        return chLimits;
                    }
                }
            },
            getSort: function (value) {
                for(var i=0; i<sorts.length; i++) {
                    if(sorts[i].value === parseInt(value))
                    {
                        var chSorts = [];
                        chSorts.push(sorts);
                        chSorts.push(sorts[i]);
                        return chSorts;
                    }
                }
            },
            getYtType: function (value) {
                for(var i=0; i<YtTypes.length; i++) {
                    if(YtTypes[i].value === parseInt(value))
                    {
                        var chYtType = [];
                        chYtType.push(YtTypes);
                        chYtType.push(YtTypes[i]);
                        return chYtType;
                    }
                }
            },
            getPluginParts: function (channel) {
                //cpsf = Count plugin subfolders
                var cpsf = channel.rules.main[1].split("/").length;
                channel.plugin = {};
                if (cpsf > 3)
                {
                    var myRegexp = /(plugin.video.*?\/)/g;
                    channel.plugin.addonid = myRegexp.exec(channel.rules.main[1]);

                    channel.plugin.addonid = channel.plugin.addonid[1].substring(0, channel.plugin.addonid[1].length -1);
                    channel.plugin.subfolders = channel.rules.main[1].split("/").splice(3, cpsf);
                    channel.plugin.pluginPath = "plugin://" + channel.plugin.addonid + "/" + channel.plugin.subfolders.join("/");
                    channel.plugin.subPath = channel.plugin.subfolders.join("/");
                    return channel;
                }
                // If there aren't any SubFolders "plugin://plugin.video.*"
                else
                {
                    myRegexp = /(plugin.video.*)/g;
                    channel.plugin.addonid = myRegexp.exec(channel.rules.main[1]);
                    channel.plugin.addonid = channel.plugin.addonid[1].substring(0, channel.plugin.addonid[1].length);
                    channel.plugin.pluginPath = "plugin://" + channel.plugin.addonid;
                    channel.plugin.subfolders = '';
                    return channel;
                }
            },
            getTypes: function () {
                return types;
            }

        }

    }]);
});