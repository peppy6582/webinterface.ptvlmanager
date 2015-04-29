define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.service('dialogService', ['$state', '$timeout', 'dialogs', function($state, $timeout, dialogs) {

        var confirmed = true;

        return {
            confirm: function (params) {
                var header = params.header;
                var body = params.body;
                var state = params.state;
                var dlg = dialogs.confirm(header, body);
                dlg.result.then(function(btn){
                    confirmed = true;
                },function(btn){
                    confirmed = false;
                    $state.go(state);
                });
                return confirmed;
            }
/*            wait: function () {
                var _fakeWaitProgress = function(){
                    $timeout(function(){
                        if(_progress < 100){
                            _progress += 33;
                            $rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
                            _fakeWaitProgress();
                        }else{
                            $rootScope.$broadcast('dialogs.wait.complete');
                            _progress = 0;
                        }
                    },1000);
                };

                var dlg = dialogs.wait(undefined,undefined,_progress);
                _fakeWaitProgress();

            }*/

        }

    }]);
});