angular.module('app.config', [])
    .constant('API_URL', 'http://localhost:8080')

    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('SUCCESS_EVENTS', {
        success: 'success',
        successUpdate: 'update-success',
        successCreate: 'create-success',
        successDelete: 'delete-success'
    })
    .constant('ERROR_EVENTS', {
        error: 'error'
    });