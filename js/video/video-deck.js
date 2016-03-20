var _ = require('lodash');

var config = require('../config/videos');
var videoQueue = require('./video-queue');

function loadVideo() {
  this.video.src = config.path + videoQueue.getNextVideo();
};

function VideoDeck() {
  this.video = document.createElement('video');
  this.video.width    = config.width;
  this.video.height   = config.height;
  this.video.muted    = true;
  this.video.autoplay = true;
  this.video.addEventListener('ended', loadVideo.bind(this));
  loadVideo.call(this);
};

module.exports = VideoDeck;