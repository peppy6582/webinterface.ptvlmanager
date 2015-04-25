define(['./ptvl'], function (ptvlServices) {
    'use strict';

    ptvlServices.factory('backupFactory', [function () {

        var backups = [];

        return {
            backup: function (value) {
                console.log('Backed up channel: ',value);
                backups.push(value);
            },
            getBackup: function (channel) {
                console.log(channel);
                for(var i=0; i<backups.length; i++) {
                    if(backups[i].channel === channel)
                    {
                        console.log(backups[i]);
                        return backups[i];
                    }
                }
            },
            getSort: function (value) {
                for(var i=0; i<sorts.length; i++) {
                    if(sorts[i].value === parseInt(value))
                    {
                        console.log(sorts[i]);
                        return sorts[i];
                    }
                }
            },
            toggleLock: function (value) {
                for(var i=0; i<locked.length; i++) {
                    if(locked[i].channel === value)
                    {
                        locked[i].locked = !locked[i].locked;
                        return locked[i].locked;
                    }
                }
            }
        }

    }]);
});