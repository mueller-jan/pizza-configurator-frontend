angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
            createUser: function (user) {
                return $http.post(API_URL + '/user', user, {headers: {'Content-Type': 'application/json'}});
            },

            addAddressToUser: function (address) {
                return $http.post(API_URL + '/user/address', address, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (address) {
                return $http.post(API_URL + '/address', address, {headers: {'Content-Type': 'application/json'}});
            },

            getAddressesFromUser: function () {
                return $http.get(API_URL + '/user/addresses');
            },

            getUserInfo: function () {
                return $http.get(API_URL + '/user/info');
            },

            addPizzaToUser: function (pizza) {
                return $http.post(API_URL + '/user/pizza', pizza, {headers: {'Content-Type': 'application/json'}});
            },

            addOrderToUser: function (order) {
                return $http.post(API_URL + '/user/order', order, {headers: {'Content-Type': 'application/json'}});
            },

            createPizza: function (pizza) {
                return $http.post(API_URL + '/pizza', pizza, {headers: {'Content-Type': 'application/json'}});
            },

            updatePizza: function (pizza) {
                return $http.put(API_URL + '/user/pizza', pizza, {headers: {'Content-Type': 'application/json'}});
            },

            deletePizza: function (pizzaId) {
                return $http.delete(API_URL + '/user/pizza/' + pizzaId);
            },

            getPizzasFromUser: function () {
                return $http.get(API_URL + '/user/pizzas');
            },

            getPizzasByIds: function (ids) {
                //http://localhost:8080/pizza/?ids=1&ids=2
                var params = "?";
                for (var i = 0; i < ids.length; i++) {
                    params += "&ids=" + ids[i];
                }
                return $http.get(API_URL + '/pizza' + params)
            },

            getSuggestions: function () {
                return $http.get(API_URL + '/pizza/suggestions')
            },

            getIngredients: function () {
                return $http.get(API_URL + '/ingredients');
            },

            getSizes: function () {
                return $http.get(API_URL + '/pizza/sizes');
            },

            createOrder: function (order) {
                return $http.post(API_URL + '/order', order, {headers: {'Content-Type': 'application/json'}});
            },

            getBillsFromUser: function () {
                return $http.get(API_URL + '/user/bills');
            }
        }
    });
