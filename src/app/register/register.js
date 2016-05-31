angular.module('app.register', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            views: {
                "main": {
                    controller: 'RegisterCtrl',
                    templateUrl: 'app/register/register.tpl.html'

                }
            },
            data: {pageTitle: 'Register'}
        });
    })

    .controller('RegisterCtrl', function RegisterController($scope, $state, CrudService) {
        $scope.register = function (user) {
            CrudService.createUser(user).then(function (res) {
                alert('Registration successful');
                var userId = res.data;
                CrudService.createAddress(userId, $scope.address).then(function (res) {
                    alert('Added address to User');
                    $state.go('home')
                }, function () {
                    alert('Adding address to user failed');
                })
            }, function () {
                alert('Registration failed');
            });
        };
    });
