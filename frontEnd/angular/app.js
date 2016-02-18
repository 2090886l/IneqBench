var app = angular.module('IneqBench',['IneqBenchControllers']);

app.factory('authInterceptor', function($rootScope,  $q, $injector) {
  return {
    request: function(config) {
        console.log("request");
      $rootScope.isLoading = true;
      return config;
    },
    response: function(response) {
        console.log("response");
      $rootScope.isLoading = false;
      return response;
    },
    responseError: function(response) {
        console.log("error");
      $rootScope.isLoading = false;
      return $q.reject(response);
    }
  };
})

.config(function($httpProvider) {
  console.log("asda");
  $httpProvider.interceptors.push('authInterceptor');
   // $routeProvider
   //          // route for the home page
   //          .when('/', {
   //              templateUrl : '/templates/index.html',
   //              controller  : 'MainController'
   //          })

   //          // route for the about page
   //          .when('/about', {
   //              templateUrl : 'pages/about.html',
   //              controller  : 'aboutController'
   //          })

   //          // route for the contact page
   //          .when('/contact', {
   //              templateUrl : 'pages/contact.html',
   //              controller e : 'contactController'
   //          });
   //  });
});
