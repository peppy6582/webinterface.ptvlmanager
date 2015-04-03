'use strict';

ptvlKodi.factory('movieList', ['$http',function($http) {

    var url = 'http://localhost:9000/jsonrpc?request=';

    var movieListReq = JSON.stringify({
        "jsonrpc":"2.0",
        "method":"VideoLibrary.GetMovies",
        "params":{
            "properties":[
                "title",
                "year",
                "playcount",
                "set"
            ],
            "sort":{
                "order":"ascending",
                "ignorearticle":false,
                "method":"sorttitle"
            }},
        "id":"WIMM"
    });


    var movieList = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url + movieListReq).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(url + movieListReq);
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return movieList;
}]);