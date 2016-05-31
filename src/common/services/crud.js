angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
            createUser: function (user) {
                return $http.post(API_URL + '/user', user, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (userId, address) {
                return $http.post(API_URL + '/user/' + userId + '/address', address, {headers: {'Content-Type': 'application/json'}});
            }
        }
    });
