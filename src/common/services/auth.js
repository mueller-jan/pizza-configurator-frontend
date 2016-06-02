angular.module('services.auth', ['app.config'])
    .factory('AuthService', [
        '$http',
        '$rootScope',
        '$window',
        'userService',
        'tokenService',
        'API_URL',
        function ($http, $rootScope, $window, userService, tokenService, API_URL) {
            var authService = {};

            authService.login = function (credentials) {
                return $http
                    .post(API_URL + '/users/login', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        tokenService.save(res.data.token);
                        userService.create(credentials.email, 'user');
                        return userService;
                    })
            };

            authService.authenticate = function () {
                var token = tokenService.load();
                return $http
                    .post(API_URL + '/token', null, {headers: {'x-access-token': token}})
                    .then(function (res) {
                        if (res.data.success !== false) {
                            userService.create(credentials.email, 'user');
                        }
                        return res.data.user;
                    })

            };

            //weak authentication mechanism for client side
            //doesn't really matter since sensible data is protected on the server side
            authService.isAuthenticated = function () {
                return (userService.email && tokenService.load() !== null)
            };

            authService.isAuthorized = function () {
                return (userService.email && (userService.role === 'user'));
            };

            authService.logout = function () {
                userService.destroy();
                tokenService.remove();
            };

            authService.getToken = function () {
                return tokenService.load();
            };

            return authService;
        }])

    .service('userService', function () {
        this.create = function (name, role) {
            this.email = name;
            this.role = role;
        };
        this.destroy = function () {
            this.email = null;
            this.role = null;
        };
    })

    .factory('tokenService', function () {
        var storageKey = 'token';
        return {
            save: function (token) {
                return localStorage.setItem(storageKey, token);
            },
            load: function () {
                return localStorage.getItem(storageKey);
            },
            remove: function () {
                return localStorage.removeItem(storageKey);
            }
        }
    })

    .factory ('authInterceptor',  [
        '$injector',
        '$q',
        '$rootScope',
        'ERROR_EVENTS',
        function ($injector) {
            return {
                request: function (req) {
                    //injected manually to get around circular dependency problem ($http).
                    var authService = $injector.get('AuthService');

                    var token = authService.getToken();
                    if (token) {
                        req.headers['Authorization'] = "Bearer " +  token;
                    }
                    return req;
                }
            }
        }]);






