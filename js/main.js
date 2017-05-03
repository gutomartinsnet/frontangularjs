/**
 * AngularJS Test Front
 * @author Guto Martins <augusto.ms@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('frontTest', ['ngRoute', 'ui.bootstrap']);

/**
 * Controler listUsersController Show Users with Pagination
 */
app.controller('listUsersController', function ($scope, $http) {

  $scope.currentPage = 1;
  $scope.limit = 10;
  $scope.totalItems = 100;
  $scope.maxSize = 5;

  $scope.results = [];
  getData();


  function getData() {
    $http.get("https://randomuser.me/api/?seed=foo&nat=br&page=" + ($scope.currentPage) + "&results=10")
      .then(function (response) {
        angular.copy(response.data.results, $scope.results)
      });
  }

  //get another portions of data on page changed
  $scope.pageChanged = function () {
    getData();
  };

   

});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", { templateUrl: "partials/home.html", controller: "HomeCtrl" })
    // Pages
    .when("/user/:md5/:page", { templateUrl: "partials/user_details.html", controller: "UserCtrl" }).
    otherwise({
      redirectTo: '/'
    });
}]);


/**
 * Controls Home to Use Specific Configurations if Necessary
 */
app.controller('HomeCtrl', function (/*$scope, $http*/$location) {
  
});


/**
 * Controls User Pages Get ID from List and Show Details of User
 */
app.controller('UserCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $scope.totalItems = 100;

  console.log($routeParams.page)
  $scope.currentPage = $routeParams.page;
  //console.log($routeParams)
  //console.log("https://randomuser.me/api/?seed=foo&nat=br&page=" + ($scope.currentPage) + "&results="+ $scope.totalItems)
  $http({
    url: "https://randomuser.me/api/?seed=foo&nat=br&page=" + ($scope.currentPage) + "&results="+ $scope.totalItems,
    //url: "https://randomuser.me/api/?seed=foo&nat=br&results="+ $scope.totalItems,
    params: $routeParams,
    method: "get"
  }).then(function (response) {
    //console.log(response.data)
    /*for (var i = 0; i <  $scope.totalItems; i++) {
      $scope.project = response.data.results[i];
      if ($scope.project.login.md5 === $routeParams.md5) {
        //console.log($scope.project)
        return $scope.project;
      }
    }*/
    angular.forEach(response.data.results, function(value, key){
      if(value.login.md5 === $routeParams.md5){
         $scope.project = response.data.results[key];
         console.log(response.data.results[key]);
        }
        
   });
  })
}]);

