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
        $scope.selectableIngredients = $scope.getIngredientsByCategories("Dough");
        $scope.selectedDough = $scope.selectableIngredients[0];

        for (var i = 0; i < $scope.selectedIngredients.length; i++) {
            for (var j = 0; j < $scope.selectableIngredients.length; j++) {
                if ($scope.selectedIngredients[i].name === $scope.selectableIngredients[j].name)  {
                    $scope.selectedDough = $scope.selectableIngredients[j];
                }
            }
        }


        $scope.addDough = function () {
            //remove doughs, because there can only be one
            var indices = [];
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                if ($scope.selectedIngredients[i].category === "Dough") {
                    //mark indeces
                    indices.push(i);
                }
            }

            for (i = indices.length - 1; i >= 0; i--) {
                $scope.selectedIngredients.splice(indices[i], 1);
            }

            //add dough
            $scope.selectedIngredients.unshift($scope.selectedDough);
            $scope.addSelectedIngredientsToPizza();
        };

        $scope.addDough();

    });