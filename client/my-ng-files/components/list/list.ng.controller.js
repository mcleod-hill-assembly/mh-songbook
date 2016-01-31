angular

.module('myMcLeodHillSongbook')

.controller('listCntrl',

['$scope','SongProxy',

function ($scope,SongProxy) {
  SongProxy
    .getAll()
    .then(function(songs){
      $scope.songs=songs;
    })
}]);