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
                    .post(API_URL + '/login', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        tokenService.save(res.data.token);
                        userService.create(res.data.user.name, res.data.user.role);
                        return res.data.user;
                    })
            };

            authService.authenticate = function () {
                var token = tokenService.load();
                return $http
                    .post(API_URL + '/token', null, {headers: {'x-access-token': token}})
                    .then(function (res) {
                        if (res.data.success !== false) {
                            userService.create(res.data.user.name, res.data.user.role);
                        }
                        return res.data.user;
                    })

            };

            //weak authentication mechanism for client side
            //doesn't really matter since sensible data is protected on the server side
            authService.isAuthenticated = function () {
                return (userService.name && tokenService.load() !== null)
            };

            authService.isAuthorized = function () {
                return (userService.name && (userService.role === 'admin'));
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
            this.name = name;
            this.role = role;
        };
        this.destroy = function () {
            this.name = null;
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
                    var authService = $injector.get('authService');

                    var token = authService.getToken();
                    if (token) {
                        req.headers['x-access-token'] = token;
                    }
                    return req;
                }
            }
        }]);






