'use strict';

ptvlKodi.directive("link", function (){
    return function($scope, element, attrs)
    {
        // ngTouch prevents links from executing when an ng-click is present, so we need to trigger the link in those instances
        if(Modernizr.touch && typeof attrs.ngClick !== 'undefined')
        {
            element.on('touchend', function(){

                element[0].click();

            });
        }
    }
});