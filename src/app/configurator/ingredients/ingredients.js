angular.module('app.configurator.ingredients', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.ingredients', {
            url: '/ingredients',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/ingredients/ingredients.tpl.html',
                    controller: 'ingredientsCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('ingredientsCtrl', function IngredientsController($scope) {
        
    });