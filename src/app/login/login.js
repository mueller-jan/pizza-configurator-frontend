angular.module('app.login', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                "main": {
                    controller: 'LoginCtrl',
                    templateUrl: 'app/login/login.tpl.html'

                }
            },
            data: {pageTitle: 'Login'}
        });
    })

    .controller('LoginCtrl',
        function LoginController($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
            $scope.credentials = {
                username: '',
                password: ''
            };

            $scope.login = function (credentials) {
                AuthService.login(credentials).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                    $state.go('admin')
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };
        });
