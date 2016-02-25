var app = angular.module('IneqBench',['IneqBenchControllers']);

app.factory('authInterceptor', function($rootScope,  $q, $injector) {
  return {
    request: function(config) {
      $rootScope.loadingCount++;
      console.log("request loading count:" + $rootScope.loadingCount);
      return config;
    },
    response: function(response) {
      $rootScope.loadingCount--;
      console.log("response loading count:" + $rootScope.loadingCount);
      return response;
    },
    responseError: function(response) {
      $rootScope.loadingCount--;
      console.log("error loading count:" + $rootScope.loadingCount);
      return $q.reject(response);
    }
  };
})

.config(function($httpProvider) {
  console.log("Config Loaded");
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
