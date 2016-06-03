angular.module('app.configurator',[
    'ui.router',
    'checklist-model',
    'ui.bootstrap',
    'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator', {
            url: '/configurator',
            views: {
                "main": {
                    controller: 'configuratorCtrl',
                    templateUrl: 'app/configurator/configurator.tpl.html'
                }
            },
            data: {pageTitle: 'configurator'},
            resolve: {
                ingredients: function (CrudService) {
                    return CrudService.getIngredients();
                }
            }
        });
    })

    .controller('configuratorCtrl', function ConfiguratorController($scope, ingredients) {
        $scope.selectedIngredients = [];
        
        $scope.ingredients = ingredients.data;
        
        //create imagePath from ingredient-name
        for (var i = 0; i < $scope.ingredients.length; i++) {
            $scope.ingredients[i].imagePath = './assets/' + $scope.ingredients[i].name + '.png';
        }

        $scope.randomize = function () {
            $scope.selectedIngredients = [];
            
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (Math.random() < 0.5) {
                    $scope.selectedIngredients.push($scope.ingredients[i])
                }
            }
        };

    });