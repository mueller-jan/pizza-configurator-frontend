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

        //check selected dough from loaded pizza
        if ($scope.selectedIngredients.length > 0) {
            var dough = $scope.getSelectedIngredientOfCategory("Dough");
        }

        if (!dough) {
            dough = $scope.selectableIngredients[0];
            $scope.selectedIngredients.push(dough);
        }
        checkSelectedIngredient(dough);
        $scope.calculatePrice();

        $scope.addDough = function (ingredient) {
            checkSelectedIngredient(ingredient);

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

            //add dough to selected meat
            $scope.selectedIngredients.unshift($scope.findIngredientByName(ingredient.name));

            $scope.calculatePrice();
        };

        function checkSelectedIngredient(ingredient) {
            for (var i = 0; i < $scope.selectableIngredients.length; i++) {
                $scope.selectableIngredients[i].checked = $scope.selectableIngredients[i].name === ingredient.name
            }
        }
    });