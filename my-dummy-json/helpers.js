const
    loremIpsum = require('lorem-ipsum')
    , _ = require('lodash')
    ;

module.exports = {
    words: function(count, options){
        var words = loremIpsum({
            count: count
            , units: 'words'
            , format: 'plain'
        });
        if (_.get(options,'hash.uppercase',false)){
            words = _.chain(words)
                .split(' ')
                .map(_.capitalize)
                .join(' ')
                .value();
        }
        return words;
    }
};