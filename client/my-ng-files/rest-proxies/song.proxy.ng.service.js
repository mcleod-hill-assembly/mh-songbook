angular

.module('myMcLeodHillSongbook')

.service('SongProxy',

['MyHttp',

function(MyHttp) {

  var SongProxy={};

  var SongPromise;

  SongProxy.getAll = function(){
    if(SongPromise){
      return SongPromise;
    }
    SongPromise = MyHttp
      .path('rest')
      .path('songs')
      .get();
    return SongPromise;
  };

  return SongProxy;

}]);