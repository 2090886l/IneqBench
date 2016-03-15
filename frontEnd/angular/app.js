var app = angular.module('IneqBench',['IneqBenchControllers']);

// interceptor to allow us the count the current number of running http requests
app.factory('authInterceptor', function($rootScope,  $q, $injector) {
    return {
        request: function(config) {
            $rootScope.loadingCount++;
            return config;
        },
        response: function(response) {
            $rootScope.loadingCount--;
            return response;
        },
        responseError: function(response) {
            $rootScope.loadingCount--;
            return $q.reject(response);
        }
    };
})

.config(function($httpProvider) {   
    $httpProvider.interceptors.push('authInterceptor');
});
