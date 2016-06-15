angular.module('app.bills', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('bills', {
            url: '/bills',
            views: {
                "main": {
                    controller: 'BillsCtrl',
                    templateUrl: 'app/bills/bills.tpl.html'

                }
            },
            resolve: {
                bills: function (CrudService) {
                    return CrudService.getBillsFromUser();
                }
            },
            data: {pageTitle: 'Bills'}
        });
    })

    .controller('BillsCtrl',
        function BillsController($scope, $rootScope, $state, CrudService, bills) {
            console.log(bills)
            $scope.bills = bills.data;
            
        });
