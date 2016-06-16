angular.module('app.configurator', [
        'ui.router',
        'app.configurator.start',
        'app.configurator.dough',
        'app.configurator.meat',
        'app.configurator.vegetable',
        'app.configurator.fruit',
        'app.configurator.cheese',
        'app.configurator.options',
        'app.configurator.order',
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
                },
                addresses: function (CrudService) {
                    return CrudService.getAddressesFromUser();
                },
                sizes: function(CrudService) {
                    return CrudService.getSizes();
                }
            }
        })

    })

    .controller('configuratorCtrl', function ConfiguratorController($scope, $state, ingredients, pizzas, suggestions, addresses, sizes, CrudService) {
        $scope.selectedIngredients = [];
        $scope.selectableIngredients = [];
        $scope.price = 0;
        $scope.ingredients = ingredients.data;
        $scope.suggestions = suggestions.data;
        $scope.pizzas = pizzas.data;
        $scope.currentState = 0;
        $scope.addresses = addresses.data;
        $scope.sizes = sizes.data;
        $scope.selectedSize = sizes.data[0];

        if (addresses.data.length > 0 && addresses !== undefined) {
            $scope.selectedAddress = addresses.data[0].id;
        }


        $scope.states = [
            "configurator.start",
            "configurator.dough",
            "configurator.meat",
            "configurator.vegetable",
            "configurator.fruit",
            "configurator.cheese",
            "configurator.options",
            "configurator.order"
        ];

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
            $scope.pizza = {};
            $scope.resetIngredients();
            $scope.price = 0;
            $scope.currentState = 1;
            $state.go($scope.states[$scope.currentState])
        };

        $scope.loadPizza = function (pizza) {
            resetState();
            $scope.resetIngredients();
            $scope.pizza = pizza;
            selectLoadedIngredients(pizza);
            $scope.calculatePrice();
            $scope.currentState = 1;
            $state.go($scope.states[$scope.currentState])
        };

        $scope.savePizza = function () {
            $scope.pizza.ingredients = [];

            //add ingredients
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                $scope.pizza.ingredients.push($scope.selectedIngredients[i].name);
            }

            //add size
            $scope.pizza.sizeName = $scope.selectedSize.name;

            //if pizza has no id, create new pizza
            CrudService.createPizza($scope.pizza).then(function () {
                alert("pizza saved");
                CrudService.getPizzasFromUser().then(function (res) {
                    $scope.pizzas = res.data;
                })
            });
        };

        $scope.deletePizza = function (pizzaId) {
            if ($scope.pizza && $scope.pizza.id) {
                var id = $scope.pizza.id;
            }

            CrudService.deletePizza(pizzaId).then(function () {
                CrudService.getPizzasFromUser().then(function (res) {
                    $scope.pizzas = res.data;
                })
            })
        };

        $scope.calculatePrice = function () {
            console.log("calc")
            console.log($scope.selectedSize)

            $scope.price = 0;
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                var ingredientPrice = $scope.selectedIngredients[i].price;
                $scope.price += ingredientPrice;
            }

            $scope.price *= $scope.selectedSize.priceFactor;
        };

        $scope.randomize = function () {
            $scope.resetIngredients();

            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (Math.random() < 0.5) {
                    $scope.selectedIngredients.push($scope.ingredients[i])
                }
            }
        };

        $scope.resetIngredients = function () {
            $scope.selectedIngredients.splice(0, $scope.selectedIngredients.length);
        };

        /**
         * Get Ingredients filtered by category
         * @param categories
         * @returns {Array}
         */
        $scope.getIngredientsByCategories = function (categories) {
            if (categories.constructor !== Array) {
                categories = [categories]
            }

            var ingredients = [];
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (categories.indexOf($scope.ingredients[i].category) !== -1) {
                    ingredients.push($scope.ingredients[i]);
                }
            }
            return ingredients;
        };

        $scope.findIngredientByName = function (name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i];
                }
            }
        };


        $scope.isIngredientInSelectedIngredients = function (ingredient) {
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                if ($scope.selectedIngredients[i].name === ingredient.name) {
                    return true;
                }
            }
            return false;
        };

        $scope.getSelectedIngredientOfCategory = function (category) {
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                if ($scope.selectedIngredients[i].category === category) {
                    return $scope.selectedIngredients[i];
                }
            }
        };

        function selectLoadedIngredients(pizza) {
            for (var i = 0; i < pizza.ingredients.length; i++) {
                var ingredientName = pizza.ingredients[i];
                for (var j = 0; j < $scope.ingredients.length; j++) {
                    if ($scope.ingredients[j].name === ingredientName) {
                        $scope.selectedIngredients.push($scope.ingredients[j]);
                    }
                }
            }
        }

        function resetState() {
            $scope.currentState = 0;
            $state.go($scope.states[$scope.currentState])
        }

    })
;