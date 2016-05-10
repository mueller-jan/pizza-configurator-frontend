angular.module('app.configurator',
    ['ui.router', 'checklist-model', 'ui.bootstrap'])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator', {
            url: '/configurator',
            views: {
                "main": {
                    controller: 'configuratorCtrl',
                    templateUrl: 'app/configurator/configurator.tpl.html'
                }
            },
            data: {pageTitle: 'configurator'}
        });
    })


    .controller('configuratorCtrl', function ConfiguratorController($scope) {
        $scope.selectedIngredients = [];

        $scope.ingredients = [
            {name: 'Pineapple', imagePath: './assets/pineapple.png'},
            {name: 'Swiss Cheese', imagePath: './assets/swisscheese.png'},
            {name: 'Mango', imagePath: './assets/mango.png'}
        ];

        $scope.randomize = function() {
            $scope.selectedIngredients = [];

            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (Math.random() < 0.5) {
                    $scope.selectedIngredients.push($scope.ingredients[i])
                }
            }
        };

    });