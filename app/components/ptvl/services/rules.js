define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.factory('ruleFactory', [function () {

        var types = [
            {type: 'Playlist',                  value: 0,   templateUrl: '/app/components/ptvl/templates/channel-types/playlist.html'},
            {type: 'TV Network',                value: 1,   templateUrl: '/app/components/ptvl/templates/channel-types/playlist.html'},
            {type: 'Movie Studio',              value: 2},
            {type: 'TV Genre',                  value: 3},
            {type: 'Movie Genre',               value: 4},
            {type: 'Mixed Genre (TV & Movie)',  value: 5},
            {type: 'TV Show',                   value: 6},
            {type: 'Directory',                 value: 7,   templateUrl: '/app/components/ptvl/templates/channel-types/directory.html'},
            {type: 'LiveTV',                    value: 8},
            {type: 'InternetTV',                value: 9},
            {type: 'YoutubeTV',                 value: 10,  templateUrl: '/app/components/ptvl/templates/channel-types/youtube.html'},
            {type: 'RSS',                       value: 11,  templateUrl: '/app/components/ptvl/templates/channel-types/rss.html'},
            {type: 'Music',                     value: 12},
            {type: 'Music Videos',              value: 13},
            {type: 'Extras',                    value: 14},
            {type: 'Plugin',                    value: 15,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'},
            {type: 'Playon',                    value: 16},
            {type: 'Global Settings',           value: 99,  templateUrl: '/app/components/ptvl/templates/channel-types/plugin.html'}
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
                        console.log(sorts[i]);
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
                        console.log(YtTypes[i]);
                        return chYtType;
                    }
                }
            },
            getTypes: function () {
                return types;
            }
        }

    }]);
});