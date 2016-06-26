angular.module('app.configurator.order', [
        'ui.router',
        'ui.bootstrap',
        'services.crud'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('configurator.order', {
            url: '/order',
            views: {
                "steps": {
                    templateUrl: 'app/configurator/order/order.tpl.html',
                    controller: 'orderCtrl'
                }
            },
            data: {pageTitle: 'configurator'}
        })

    })

    .controller('orderCtrl', function OrderController($scope, $state, CrudService) {
        $scope.selectablePizzas = $scope.pizzas.concat($scope.suggestions);
        $scope.selectedPizzas = [];
        $scope.total = 0;

        //add first and lastname from logged in user to address
        $scope.address = {};
        if ($scope.currentUser) {
            $scope.address.firstname = $scope.currentUser.firstName;
            $scope.address.lastname = $scope.currentUser.lastName;
        }

        $scope.calculateTotal = function () {
            $scope.total = 0;
            for (var i = 0; i < $scope.selectedPizzas.length; i++) {
                $scope.calculatePriceOfPizza($scope.selectedPizzas[i]);
                $scope.total += $scope.price;
            }
        };

        $scope.placeOrder = function () {
            if ($scope.currentUser) {
                createOrder();
            } else {
                createOrderWithoutUser();
            }
            $scope.setState(0);
        };

        function createOrderWithoutUser() {
            //if not logged in create Address without user
            CrudService.createAddress($scope.address).then(function (res) {
                //set id of selected address to returned value
                $scope.selectedAddress = res.data;
                if ($scope.selectedAddress) {
                    CrudService.createOrder(createOrderObject()).then(function (res) {
                        alert("Order created");
                    });
                } else {
                    alert("failed to create order");
                }
            })
        }

        function createOrder() {
            if (!$scope.selectedAddress) {
                CrudService.addAddressToUser($scope.address).then(function (res) {
                    alert("Address created");
                    //set id of selected address to returned value
                    $scope.selectedAddress = res.data;
                    if ($scope.selectedAddress) {
                        addOrderToUser();
                    } else {
                        alert("failed to create order");
                    }
                })
            } else {
                addOrderToUser();
            }
        }

        function createOrderObject() {
            return {
                addressId: $scope.selectedAddress,
                pizzaIds: getPizzaIds()
            };
        }

        function addOrderToUser() {
            CrudService.addOrderToUser(createOrderObject()).then(function (res) {
                alert("Order created");
            })
        }

        function getPizzaIds() {
            var ids = [];
            for (var i = 0; i < $scope.selectedPizzas.length; i++) {
                ids.push($scope.selectedPizzas[i].id)
            }
            return ids;
        }
    });