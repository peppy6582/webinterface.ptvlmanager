define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.factory('channelList', ['$http', '$location', function ($http, $location) {



        var ip = $location.host();

        var port = 9000;

        var url = 'http://' + ip + ':' + port + '/jsonrpc?request=';

        var channelListReq = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "Files.GetDirectory",
                "params": {
                    "directory": "special://profile/addon_data/script.pseudotv.live",
                    "media": "files"
                }
            }
        );

        var channelList = {
            async: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + channelListReq).then(function (response) {
                    console.log(response.data.result);
                    // The return value gets picked up by the then in the controller.
                    return response.data.result;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return channelList;
    }]);
});