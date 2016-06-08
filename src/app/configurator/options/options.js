angular.module('app.configurator.options', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.options', {
            url: '/options',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/options/options.tpl.html',
                    controller: 'optionsCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('optionsCtrl', function OptionsController($scope) {
        
    });