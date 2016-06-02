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
            data: {pageTitle: 'Profile'}
        });
    })

    .controller('ProfileCtrl',
        function ProfileController($scope, $rootScope, $state, CrudService) {
            CrudService.getUserInfo().then(function(res) {
                $scope.user = res.data;
            })
        });
