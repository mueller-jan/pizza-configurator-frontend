angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {

            createUser: function (user) {
                return $http.post(API_URL + '/user', user, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (address) {
                return $http.post(API_URL + '/user/address', address, {headers: {'Content-Type': 'application/json'}});
            },

            getUserInfo: function () {
                return $http.get(API_URL + '/user/info');
            },

            createPizza: function (pizza) {
                return $http.post(API_URL + '/user/pizza', pizza, {headers: {'Content-Type': 'application/json'}});
            },

            getPizzasFromUser: function () {
                return $http.get(API_URL + '/user/pizzas');
            },

            getIngredients: function () {
                return $http.get(API_URL + '/ingredients');
            }
        }
    });
