angular

.module("myMcLeodHillSongbook")

.config(['$routeProvider',

function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: '/client/my-ng-files/partials/index.html'
  })
  .otherwise({
    redirectTo: '/index'
  });
}]);