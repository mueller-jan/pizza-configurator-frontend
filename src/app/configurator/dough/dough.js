angular.module('app.configurator.dough', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.dough', {
            url: '/dough',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/dough/dough.tpl.html',
                    controller: 'doughCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('doughCtrl', function DoughController($scope) {
        
    });