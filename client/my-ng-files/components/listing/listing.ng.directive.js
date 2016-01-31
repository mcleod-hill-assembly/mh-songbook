angular

.module('myMcLeodHillSongbook')

.directive('listing', function () {

  return {
    restrict: 'E'
    , scope: { song:'=',index:'='}
    , controller: 'listingCntrl'
    , templateUrl: 'components/listing/listing.ng.template.html'
  };
});