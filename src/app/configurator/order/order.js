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

    .controller('orderCtrl', function OrderController($scope, CrudService) {
        $scope.selectablePizzas = $scope.pizzas.concat($scope.suggestions);
        $scope.selectedPizzas = [];
        $scope.total = 0;
        
        $scope.calculateTotal = function() {
            for (var i = 0; i < $scope.selectedPizzas.length; i++) {
                $scope.total += calculatePrice
            }
        };

        $scope.placeOrder = function () {
            //if no address provided, create address first
            if (!$scope.selectedAddress) {
                CrudService.createAddress($scope.address).then(function (res) {
                    //set id of selected address to returned value
                    $scope.selectedAddress = res.data;
                    if ($scope.selectedAddress) {
                        createOrder();
                    } else {
                        alert("failed to create order");
                    }
                })
            } else {
                createOrder();
            }
        };

        function createOrder() {
            $scope.order = {
                addressId: $scope.selectedAddress,
                pizzaIds: $scope.selectedPizzas
            };
            
            CrudService.createOrder($scope.order).then(function (res) {
                alert("Order created");
            })
        }
    });