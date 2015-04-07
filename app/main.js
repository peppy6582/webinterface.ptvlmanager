require.config({

    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        "uiRouter": "../bower_components/angular-ui-router/release/angular-ui-router",
        "uiBootstrap": "../bower_components/angular-bootstrap/ui-bootstrap.min",
        "uiTemplates": "../bower_components/angular-bootstrap/ui-bootstrap-tpls",
        "ngAria": "../bower_components/angular-aria/angular-aria.min",
        "ngAnimate": "../bower_components/angular-animate/angular-animate.min",
        "ngSanitize": "../bower_components/angular-sanitize/angular-sanitize.min",
        "ngTouch": "../bower_components/angular-touch/angular-touch.min"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter':{
            deps: ['angular']
        },
        'uiBootstrap':{
            deps: ['angular']
        },
        'uiTemplates':{
            deps: ['angular', 'uiBootstrap']
        },
        'ngAria':{
            deps: ['angular']
        },
        'ngAnimate':{
            deps: ['angular']
        },
        'ngSanitize':{
            deps: ['angular']
        },
        'ngTouch':{
            deps: ['angular']
        }

    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});