var app = angular.module('app', ['ui.router', 'checklist-model'])

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        $scope.selectedIngredients = [];
        $scope.ingredients = [
            {name: 'Pineapple', imagePath: './assets/pineapple.png'},
            {name: 'Swiss Cheese', imagePath: './assets/swisscheese.png'}
        ];
    });

