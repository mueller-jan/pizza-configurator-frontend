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
      
        $scope.createOrder = function () {
            $scope.order = {
                addressId: $scope.selectedAddress,
                pizzaIds:  $scope.selectedPizzas
            };

            CrudService.createOrder($scope.order).then(function (res) {
                alert("Order created");
            })
        };
    });