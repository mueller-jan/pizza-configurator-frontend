angular.module('app.configurator.vegetable', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.vegetable', {
            url: '/meat',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/vegetable/vegetable.tpl.html',
                    controller: 'vegetableCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('vegetableCtrl', function VegetableController($scope) {
        $scope.selectableIngredients = $scope.getIngredientsByCategories(["Vegetable"]);
    });