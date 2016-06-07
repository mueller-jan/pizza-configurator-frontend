angular.module('app.configurator', [
        'ui.router',
        'app.configurator.start',
        'app.configurator.dough',
        'app.configurator.sauce',
        'app.configurator.ingredients',
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
                pizzas: function (CrudService) {
                    return CrudService.getPizzasFromUser()
                },
                suggestions: function (CrudService) {
                    return CrudService.getSuggestions();
                }
            }
        })

    })

    .controller('configuratorCtrl', function ConfiguratorController($scope, $state, ingredients, pizzas, suggestions, CrudService) {
        $scope.selectedIngredients = [];
        $scope.price = 0;
        $scope.ingredients = ingredients.data;
        $scope.suggestions = suggestions.data;
        $scope.pizzas = pizzas.data;
        $scope.submitButtonName = "Create Pizza";
        $scope.currentState = 0;
        $scope.states = ["configurator.start", "configurator.dough", "configurator.sauce", "configurator.ingredients"];

        $scope.nextState = function (forward) {
            if (forward) {
                if ($scope.currentState < $scope.states.length) {
                    $scope.currentState++;
                }
            } else {
                if ($scope.currentState > 0) {
                    $scope.currentState--;
                }
            }
            $state.go($scope.states[$scope.currentState])
        };

        //create imagePath from ingredient-name
        for (var i = 0; i < $scope.ingredients.length; i++) {
            $scope.ingredients[i].imagePath = './assets/' + $scope.ingredients[i].name + '.png';
        }

        $scope.newPizza = function () {
            $scope.submitButtonName = "Create Pizza";
            $scope.pizza = {};
            resetIngredients();
            $scope.price = 0;
            $scope.currentState = 0;
            $state.go($scope.states[$scope.currentState])
        };

        $scope.loadSuggestion = function (suggestion) {
            //TODO: outsource pizza creation to PizzaFactory
            $scope.submitButtonName = "Create Pizza";
            var pizza = {ingredients: suggestion.ingredients, name: suggestion.name, sizeName: suggestion.sizeName};
            $scope.loadPizza(pizza);
        };

        $scope.loadPizza = function (pizza) {
            resetIngredients();
            if (pizza.id) {
                $scope.submitButtonName = "Update Pizza";
            }
            $scope.pizza = pizza;

            for (var i = 0; i < pizza.ingredients.length; i++) {
                var ingredientName = pizza.ingredients[i];
                for (var j = 0; j < $scope.ingredients.length; j++) {
                    if ($scope.ingredients[j].name === ingredientName) {
                        $scope.selectedIngredients.push($scope.ingredients[j]);
                    }
                }
            }
            $scope.calculatePrice();
        };

        $scope.savePizza = function () {
            $scope.pizza.ingredients = [];

            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                $scope.pizza.ingredients.push($scope.selectedIngredients[i].name);
            }

            if (!$scope.pizza.id) {
                //if pizza has no id, create new pizza
                CrudService.createPizza($scope.pizza).then(function () {
                    alert("pizza saved");
                    CrudService.getPizzasFromUser().then(function (res) {
                        $scope.pizzas = res.data;
                    })
                });
            } else {
                //if pizza has id, update pizza
                CrudService.updatePizza($scope.pizza).then(function () {
                    alert("pizza updated");
                    CrudService.getPizzasFromUser().then(function (res) {
                        $scope.pizzas = res.data;
                    })
                });
            }
        };

        $scope.deletePizza = function (pizzaId) {
            if ($scope.pizza && $scope.pizza.id) {
                var id = $scope.pizza.id;
            }

            if (id && pizzaId === id) {
                delete $scope.pizza.id;
                $scope.submitButtonName = "Create Pizza"
            }
            CrudService.deletePizza(pizzaId).then(function () {
                CrudService.getPizzasFromUser().then(function (res) {
                    $scope.pizzas = res.data;
                })
            })
        };

        $scope.calculatePrice = function () {
            $scope.price = 0;
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                var ingredientPrice = $scope.selectedIngredients[i].price;
                $scope.price += ingredientPrice;
            }
        };

        $scope.randomize = function () {
            resetIngredients();

            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (Math.random() < 0.5) {
                    $scope.selectedIngredients.push($scope.ingredients[i])
                }
            }
        };

        function resetIngredients() {
            $scope.selectedIngredients.splice(0, $scope.selectedIngredients.length);
        }
    })
;