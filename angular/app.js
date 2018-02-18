var app = angular.module('myAngular',['ngRoute','ui.bootstrap']);

app.controller('allDataController',['$http','$q','$location','$scope','$filter',function($http,$q,$location,$scope,$filter){

    var main = this;

    //Data Source URLs
    this.jsonURL2015 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    this.jsonURL2016 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

    //Load all match details
    this.loadAllMatchDetails = function(){

        //Initialization Part
        $scope.filteredMatches = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;
        main.allData = [], main.searchFilteredData = [];
        main.allMatches = [], main.matchIndex = 1;
        main.filterByOptions = ["Team Name","Score","Year","Full Date","Round Name"];
        main.searchText = "", main.filterBy="";

        //Using $q.all to get multiple data through http request
        main.allData.push($http.get(main.jsonURL2015, {'cache': false}));
        main.allData.push($http.get(main.jsonURL2016, {'cache': false}));


        //For merging both responses into single obect (allMatches) once both the responses received
        $q.all(main.allData).then(function(response) {

            angular.forEach(response, function(dataByYear) {
              angular.forEach(dataByYear, function(all) {
                  //console.log(all.rounds);
                  angular.forEach(all.rounds, function(round) {
                      main.roundName = round.name
                      angular.forEach(round.matches, function(matchDetails) {
                          matchDetails.roundName = main.roundName;
                          matchDetails.index = main.matchIndex++;
                          main.allMatches.push(matchDetails);
                          main.searchFilteredData = main.allMatches; //As there is no search filter applicable at the time of loading
                          main.filteredMatches = main.allMatches.slice(0,10);//This will be used for displaying records in the table
                      });
                  });
              });
            });

            console.log(main.allMatches);

        });

    };

    //Function to redirect to view containing single match details
    this.singleMatchDetails = function(teamname) {
        //$location.path("/something");
        alert(teamname);
    }

    //Function to get the number of pages
    $scope.numPages = function() {
        return Math.ceil(main.searchFilteredData.length / $scope.numPerPage);
    };

    //Creating filtered result set here
    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage),
          end = begin + parseInt($scope.numPerPage);
        if(main.searchText != ""){
          main.filteredMatches = main.searchFilteredData.slice(begin, end);
        }
        else {
          main.filteredMatches = main.allMatches.slice(begin, end);
        }
    });

    //Function to filter data according to search text
    this.filterData = function(){
        switch (main.filterBy) {
          case 'Team Name':
            //main.searchFilteredData = $filter('filter')(main.allMatches, { team1 : { name : main.searchText }  });
            main.searchFilteredData = $filter('filter')(main.allMatches, function(value){
                  //console.log(value.team1.name.search(main.searchText));
                  if(value.team1.name.search(new RegExp(main.searchText, "i")) !== -1){
                      return value;
                  }
                  else if(value.team2.name.search(new RegExp(main.searchText, "i")) !== -1){
                      return value;
                  }
            });
            break;
          case 'Score':
            break;
          case 'Year':
            break;
          case 'Round Name':
            break;
          case 'Score':
            break;
          default:

        }
        //main.searchFilteredData = $filter('filter')(main.allMatches, { roundName: main.searchText });
        main.filteredMatches = main.searchFilteredData.slice(0, $scope.numPerPage);
        //console.log(main.searchText);
    };

    this.testFunction = function(data){
      console.log('Test Function executed. Value : ');
      console.log(data);
      return true;
    }


}]);
