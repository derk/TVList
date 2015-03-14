// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.utils', 'restangular'])

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/tvlist');
        RestangularProvider.setDefaultRequestParams({'apiKey': '7Ee-Lc9qFgaNY7qEPLLPqA8zxCR4p2pa'});

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.series', {
                url: "/series",
                views: {
                    'series-tab': {
                        templateUrl: "templates/series.html",
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('tabs.movies', {
                url: "/movies",
                views: {
                    'movies-tab': {
                        templateUrl: "templates/movies.html",
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('tabs.other', {
                url: "/other",
                views: {
                    'other-tab': {
                        templateUrl: "templates/other.html",
                        controller: 'mainCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise("/tab/series");

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
