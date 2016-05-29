var app = angular.module('app', [
    'app.home',
    'app.configurator',
    'app.register',
    'app.config',
    'services.crud',
    'ui.bootstrap',
    'ui.router'])

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | pizza-configurator';
            }
        });
    });
