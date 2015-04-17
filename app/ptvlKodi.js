define([
    'angular',
    'uiRouter',
    'uiBootstrap',
    'uiSortable',
    'uiTemplates',
    'uiSelect',
    'ngAria',
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'blob',
    'x2js',
    './components/movies/services/index',
    './components/television/services/index',
    './components/movies/controllers/index',
    './components/television/controllers/index',
    './components/ptvl/filters/propsFilter',
    './components/ptvl/directives/onReadFile',
    './components/ptvl/services/settingsXml',
    './components/ptvl/services/plugins',
    './components/ptvl/controllers/settingsXml'

], function (ng) {
    'use strict';

    return ng.module('ptvlKodi', [
        'ptvlKodi.moviesServices',
        'ptvlKodi.moviesControllers',
        'ptvlKodi.televisionServices',
        'ptvlKodi.televisionControllers',
        'ptvlKodi.ptvlFilters',
        'ptvlKodi.ptvlDirectives',
        'ptvlKodi.ptvlServices',
        'ptvlKodi.ptvlControllers',
        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'ui.sortable',
        'ngAria',
        'ngAnimate',
        'ngSanitize',
        'ngTouch'
    ]);
});



