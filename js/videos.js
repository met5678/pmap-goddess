var _ = require('lodash');

var config     = require('./config/videos');
var VideoDeck  = require('./video/video-deck');

var decks = [];
for(var a=0; a<config.decks; a++) {
  decks.push(new VideoDeck());
}

module.exports = decks;