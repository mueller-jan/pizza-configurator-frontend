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
            CrudService.createUser(user).then(function () {
                alert('Registration successful');
                $state.go('login');
            }, function () {
                alert('Email already exists')
            });
        };
    });
