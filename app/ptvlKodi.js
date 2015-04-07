define([
    'angular',
    'uiRouter',
    'uiBootstrap',
    'uiTemplates',
    'ngAria',
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    './components/movies/services/index',
    './components/television/services/index',
    './components/movies/controllers/index',
    './components/television/controllers/index',
    './components/ptvl/directives/fileListBind',
    './components/ptvl/services/settingsXml',
    './components/ptvl/services/channels',
    './components/ptvl/controllers/settingsXml'

], function (ng) {
    'use strict';

    return ng.module('ptvlKodi', [
        'ptvlKodi.moviesServices',
        'ptvlKodi.moviesControllers',
        'ptvlKodi.televisionServices',
        'ptvlKodi.televisionControllers',
        'ptvlKodi.ptvlDirectives',
        'ptvlKodi.ptvlServices',
        'ptvlKodi.ptvlControllers',
        'ui.router',
        'ui.bootstrap',
        'ngAria',
        'ngAnimate',
        'ngSanitize',
        'ngTouch'
    ]);
});



