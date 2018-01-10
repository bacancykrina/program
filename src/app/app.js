require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-material-data-table');
require('./components/home/home.js');

var app = angular.module('programApp', ['ui.router','ngMaterial','programApp.home','md.data.table','ngAria']);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      views : {
        "" : {
          templateUrl:"app/components/home/home.html"
        },
        "header@home":{
          templateUrl:"app/common/header/header.html"
        }
      }
    });
});