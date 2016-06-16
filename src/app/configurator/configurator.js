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
                sizes: function (CrudService) {
                    return CrudService.getSizes();
                },
                suggestions: function (CrudService) {
                    return CrudService.getSuggestions();
                }
            }
        })
    })

    .controller('configuratorCtrl', function ConfiguratorController($scope, $state, ingredients, suggestions, sizes, CrudService) {

        //load userdata if logged in
        if ($scope.currentUser) {
            CrudService.getPizzasFromUser().then(function (res) {
                $scope.pizzas = res.data;
            });

            CrudService.getAddressesFromUser().then(function (res) {
                $scope.addresses = res.data;
            });

            if (addresses.data.length > 0 && addresses !== undefined) {
                $scope.selectedAddress = addresses.data[0].id;
            }
        } else {
            //if not logged in get saved pizza ids from localstorage
            //and retrieve pizzas by ids
            var ids = getIdsFromLocalStorage();
            if (ids && ids.length > 0) {
                CrudService.getPizzasByIds(ids).then(function (res) {
                    $scope.pizzas = res.data;
                })
            }
        }

        $scope.selectedIngredients = [];
        $scope.selectableIngredients = [];
        $scope.ingredients = ingredients.data;
        $scope.suggestions = suggestions.data;
        $scope.sizes = sizes.data;
        $scope.selectedSize = sizes.data[0];
        $scope.price = 0;
        $scope.currentState = 0;

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
            $scope.pizza = {ingredients: [], sizeName: $scope.selectedSize.name};
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
            selectLoadedSize(pizza);
            $scope.calculatePriceOfPizza(pizza);
            $scope.currentState = 0;
            $state.go($scope.states[$scope.currentState])
        };

        $scope.savePizza = function () {
            if ($scope.currentUser) {
                CrudService.addPizzaToUser($scope.pizza).then(function () {
                    alert("pizza saved");
                    CrudService.getPizzasFromUser().then(function (res) {
                        $scope.pizzas = res.data;
                    })
                });
            } else {
                CrudService.createPizza($scope.pizza).then(function (res) {
                    var pizzaId = res.data;
                    var ids = getIdsFromLocalStorage();
                    if (!ids) {
                        ids = [];
                    }
                    ids.push(pizzaId);
                    saveIdsToLocalStorage(ids);
                    CrudService.getPizzasByIds(ids).then(function (res) {
                        $scope.pizzas = res.data;
                    })
                });
            }
        };

        $scope.deletePizza = function (pizzaId) {
            if ($scope.pizza && $scope.pizza.id) {
                var id = $scope.pizza.id;
            }

            if ($scope.currentUser) {
                CrudService.deletePizza(pizzaId).then(function () {
                    CrudService.getPizzasFromUser().then(function (res) {
                        $scope.pizzas = res.data;
                    })
                })
            } else {
                //delete pizzaId from localstorage
                var ids = getIdsFromLocalStorage();
                var index = ids.indexOf(pizzaId);
                if (index > -1) {
                    ids.splice(index, 1);
                }
                saveIdsToLocalStorage(ids);
                if (ids.length > 0) {
                    CrudService.getPizzasByIds(ids).then(function (res) {
                        $scope.pizzas = res.data;
                    })
                } else {
                    $scope.pizzas = [];
                }
            }
        };

        $scope.addSelectedIngredientsToPizza = function () {
            $scope.pizza.ingredients = [];

            //add ingredients
            for (var i = 0; i < $scope.selectedIngredients.length; i++) {
                $scope.pizza.ingredients.push($scope.selectedIngredients[i].name);
            }

            $scope.calculatePriceOfPizza($scope.pizza);
        };

        $scope.addSelectedSizeToPizza = function () {
            $scope.pizza.sizeName = $scope.selectedSize.name;
            $scope.calculatePriceOfPizza($scope.pizza);
        };

        $scope.calculatePriceOfPizza = function (pizza) {
            $scope.price = 0;
            for (var i = 0; i < pizza.ingredients.length; i++) {
                var ingredientName = pizza.ingredients[i];
                var ingredient = getIngredientByName(ingredientName);
                $scope.price += ingredient.price;
            }
            var priceFactor;
            for (i = 0; i < $scope.sizes.length; i++) {
                if ($scope.sizes[i].name === pizza.sizeName) {
                    priceFactor = $scope.sizes[i].priceFactor;
                }
            }
            $scope.price *= priceFactor;
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

        function selectLoadedIngredients(pizza) {
            for (var i = 0; i < pizza.ingredients.length; i++) {
                var ingredientName = pizza.ingredients[i];
                var ingredient = getIngredientByName(ingredientName);
                $scope.selectedIngredients.push(ingredient);
            }
        }

        function selectLoadedSize(pizza) {
            for (var i = 0; i < $scope.sizes.length; i++) {
                if ($scope.sizes[i].name === pizza.sizeName) {
                    $scope.selectedSize = $scope.sizes[i];
                }
            }
        }

        function resetState() {
            $scope.currentState = 0;
            $state.go($scope.states[$scope.currentState])
        }

        function getIngredientByName(name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i];
                }
            }
        }

        function getIdsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('pizzaIds'));
        }

        function saveIdsToLocalStorage(ids) {
            localStorage.setItem('pizzaIds', JSON.stringify(ids));
        }
    })
;