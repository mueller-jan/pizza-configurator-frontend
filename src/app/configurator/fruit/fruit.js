angular.module('app.configurator.fruit', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.fruit', {
            url: '/fruit',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/fruit/fruit.tpl.html',
                    controller: 'fruitCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('fruitCtrl', function FruitController($scope) {
        $scope.selectableIngredients = $scope.getIngredientsByCategories(["Fruit"]);
    });