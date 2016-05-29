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

    .controller('RegisterCtrl', function RegisterController($scope, crudService) {
        $scope.register = function (user) {
            crudService.createUser(user).then(function (user) {

                alert('Registration successful');
                $scope.user.email = '';
                $scope.user.firstName = '';
                $scope.user.lastName = '';
                $scope.user.password = '';

            }, function () {
                alert('Registration failed');
            });
        };
    });
