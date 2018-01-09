var myApp = angular.module('footballApp',['ngRoute']);

//Main controller
myApp.controller('allDataController',['$http','$q',function($http,$q){
  var main = this;

  //Data Source URLs
  this.jsonURL2015 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.jsonURL2016 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

  //Load all match details
  this.loadAllMatchDetails = function(){

      //Using $q.all to get multiple data through http request
      main.match_list_1 = $http.get(main.jsonURL2015, {'cache': false});
      main.match_list_2 = $http.get(main.jsonURL2015, {'cache': false});

      $q.all([main.match_list_1, main.match_list_2]).then(function(values) {
          console.log(values);
      });
      //$q.all - Ends Here



      //Function to get data through http request
      // var getData = function(linkURL){
      //   $http({
      //       method: 'GET',
      //       url: linkURL
      //   }).then(function successHandler(response) {
      //       console.log('1');
      //       console.log(response);
      //       angular.forEach(response.data.rounds, function(round) {
      //           main.round = round;
      //           angular.forEach(round.matches, function(match) {
      //             match.roundName = main.round.name;
      //             main.allMatches.push(match);
      //           });
      //       });
      //       console.log('2');
      //       console.log(main.allMatches);
      //     }, function errorHandler(response){
      //       console.log(response);
      //     })
      // }
      //
      // main.allMatches = [];
      // getData(main.jsonURL2015);
      // console.log('3');
      // console.log(main.allMatches);
  }
}]);
