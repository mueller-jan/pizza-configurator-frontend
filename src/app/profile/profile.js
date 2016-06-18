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
                userInfo: function (CrudService) {
                    return CrudService.getUserInfo();
                },
                addresses: function(CrudService) {
                    return CrudService.getAddressesFromUser();
                }
            },
            data: {pageTitle: 'Profile'}
        });
    })

    .controller('ProfileCtrl',
        function ProfileController($scope, $rootScope, $state, CrudService, userInfo, addresses) {
            $scope.user = userInfo.data;
            $scope.addresses = addresses.data;
        });
