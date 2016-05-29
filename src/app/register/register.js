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
            }, function () {
                // $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    });
