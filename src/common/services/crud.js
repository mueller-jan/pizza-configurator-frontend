angular.module('services.crud', ['app.config'])
    .factory('crudService', function ($http, API_URL) {
        return {
            createUser: function (user) {
                return $http.post(API_URL + '/user', user, {headers: {'Content-Type': 'application/json'}});
            }
        }
    });
