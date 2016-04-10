(function() {

    'use strict';

    angular.module('cgApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate']);

    angular.module('cgApp').config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/join');

      $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "templates/dashboard.html",
        controller: "dashboardCtrl"
      });

      $stateProvider.state("join", {
        url: "/join",
        templateUrl: "templates/join.html",
        controller: "joinController"
      });

    });

})();
