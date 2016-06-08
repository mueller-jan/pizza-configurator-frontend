angular.module('app.configurator.cheese', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.cheese', {
            url: '/cheese',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/cheese/cheese.tpl.html',
                    controller: 'cheeseCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('cheeseCtrl', function CheeseController($scope) {
        $scope.selectableIngredients = $scope.getIngredientsByCategories(["Cheese"]);
    });