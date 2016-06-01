angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
            createUser: function (user) {
                return $http.post(API_URL + '/users', user, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (userId, address) {
                return $http.post(API_URL + '/users/' + userId + '/addresses', address, {headers: {'Content-Type': 'application/json'}});
            }
        }
    });
