angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
                        
            createUser: function (user) {
                return $http.post(API_URL + '/user', user, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (userId, address) {
                return $http.post(API_URL + '/user/' + userId + '/addresses', address, {headers: {'Content-Type': 'application/json'}});
            },

            getUserInfo: function () {
                return $http.get(API_URL + '/user/info');
            },

            getIngredients: function () {
                return $http.get(API_URL + '/ingredients');
            }
        }
    });
