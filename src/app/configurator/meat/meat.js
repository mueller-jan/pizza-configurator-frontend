angular.module('app.configurator.meat', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.meat', {
            url: '/meat',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/meat/meat.tpl.html',
                    controller: 'meatCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('meatCtrl', function MeatController($scope) {
        $scope.selectableIngredients = $scope.getIngredientsByCategories(["Meat"]);
    });