angular.module('app.configurator.start', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.start', {
            url: '/start',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/start/start.tpl.html',
                    controller: 'startCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('startCtrl', function StartController($scope) {
        
    });