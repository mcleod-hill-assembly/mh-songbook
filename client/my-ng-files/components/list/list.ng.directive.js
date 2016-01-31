angular

.module('myMcLeodHillSongbook')

.directive('list', function () {

  return {
    restrict: 'E'
    , scope: { song:'=',query:'='}
    , controller: 'listCntrl'
    , templateUrl: 'components/list/list.ng.template.html'
  };
});