myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      .when('/',{
          templateUrl   : 'views/view-allMatches.html',
          controller    : 'allDataController',
          controllerAs  : 'ctrlAllData'
      })
      .otherwise(
        {
          template   : '<h1>404 page not found</h1>'
        }
      );
}]);
