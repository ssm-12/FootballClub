var myApp = angular.module('footballApp',['ngRoute','ui.bootstrap']);

//Main controller
myApp.controller('allDataController',['$http',function($http){
  var main = this;
  this.jsonURL = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  console.log(this.jsonURL);
  //Load all match details
  this.loadAllMatchDetails = function(){

      console.log('Load All Matches Called');
      $http({
        method: 'GET',
        url: main.jsonURL
      }).then(function successHandler(response) {
          console.log(response);
          main.counter = 0;
          main.allMatches = response.data;
        }, function errorHandler(response){
          console.log(response);

        })
  }
}]);
