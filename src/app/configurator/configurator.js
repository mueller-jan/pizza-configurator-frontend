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
                },
                pizzas: function(CrudService) {
                  return CrudService.getPizzasFromUser()
                }
            }
        });
    })

    .controller('configuratorCtrl', function ConfiguratorController($scope, ingredients, pizzas, CrudService) {
        $scope.selectedIngredients = [];
        
        $scope.ingredients = ingredients.data;
        $scope.pizzas = pizzas.data;

        //create imagePath from ingredient-name
        for (var i = 0; i < $scope.ingredients.length; i++) {
            $scope.ingredients[i].imagePath = './assets/' + $scope.ingredients[i].name + '.png';
        }

        $scope.loadPizza = function(pizza) {
            $scope.pizza = pizza;
            $scope.selectedIngredients = [];
            for (var i = 0; i < pizza.ingredients.length; i++) {
                var ingredientName = pizza.ingredients[i];
                for (var j = 0; j < $scope.ingredients.length; j++) {
                    if ($scope.ingredients[j].name === ingredientName) {
                        $scope.selectedIngredients.push($scope.ingredients[i]);
                    }
                }
            }
        };


        $scope.savePizza = function() {
            $scope.pizza.ingredients = [];
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                $scope.pizza.ingredients.push($scope.selectedIngredients[i].name);
            }

            CrudService.createPizza($scope.pizza).then(function(res) {
                alert("pizza saved");
                CrudService.getPizzasFromUser().then(function(res) {
                    $scope.pizzas = res.data;
                })
            });
        };

        $scope.randomize = function () {
            $scope.selectedIngredients = [];
            
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (Math.random() < 0.5) {
                    $scope.selectedIngredients.push($scope.ingredients[i])
                }
            }
        };
    });