define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.service('dialogService', ['$state', '$timeout', 'dialogs', function($state, $timeout, dialogs) {

        var confirmed = true;

        return {
            confirm: function () {
                var dlg = dialogs.confirm("Just so you know", "This application is a work in progress.  Any item whose name or title contains (WIP) or (Not Started), should be expected to destroy your settings.  " +
                "Feel free to play with them if you want, but PLEASE make sure you have backed up your settings.  " +
                "You have been warned!  Click Yes if you would like to continue.");
                dlg.result.then(function(btn){
                    confirmed = true;
                },function(btn){
                    confirmed = false;
                    $state.go('home');
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