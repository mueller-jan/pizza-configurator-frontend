angular.module('app.configurator.sauce', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.sauce', {
            url: '/sauce',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/sauce/sauce.tpl.html',
                    controller: 'sauceCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('sauceCtrl', function SauceController($scope) {
        
    });