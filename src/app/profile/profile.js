angular.module('app.profile', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            views: {
                "main": {
                    controller: 'ProfileCtrl',
                    templateUrl: 'app/profile/profile.tpl.html'

                }
            },
            resolve: {
                addresses: function(CrudService) {
                    return CrudService.getAddressesFromUser();
                }
            },
            data: {pageTitle: 'Profile'}
        });
    })

    .controller('ProfileCtrl',
        function ProfileController($scope, $rootScope, $state, CrudService, addresses) {
            $scope.addresses = addresses.data;
        });
