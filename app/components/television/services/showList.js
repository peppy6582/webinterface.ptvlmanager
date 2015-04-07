define(['./television'], function (televisonServices) {
    'use strict';

    televisonServices.factory('showList', ['$http', '$location', function ($http, $location) {

        var ip = $location.host();

        var port = 9000;

        var url = 'http://' + ip + ':' + port + '/jsonrpc?request=';

        var showListReq = JSON.stringify({
            "jsonrpc": "2.0",
            "method": "VideoLibrary.GetTVShows",
            "params": {
                "properties": [
                    "title",
                    "genre",
                    "year",
                    "playcount"
                ],
                "sort": {
                    "order": "ascending",
                    "ignorearticle": false,
                    "method": "sorttitle"
                }
            },
            "id": "PTVLM"
        });


        var showList = {
            async: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + showListReq).then(function (response) {

                    console.log(response.data.result.tvshows);
                    // The return value gets picked up by the then in the controller.
                    return response.data.result.tvshows;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return showList;
    }]);
});