var _ = require('lodash');

var config = require('../config/videos');
var videoQueue = require('./video-queue');
var driver = require('../driver');


function loadVideo() {
  this.filename = videoQueue.getNextVideo();
  this.video.src = config.path + this.filename;
};

function VideoDeck() {
  this.video = document.createElement('video');
  this.video.width    = config.width;
  this.video.height   = config.height;
  this.video.muted    = true;
  this.video.autoplay = true;
  this.video.addEventListener('ended', loadVideo.bind(this));
  loadVideo.call(this);

  driver.on('presetChange',loadVideo.bind(this));
};

module.exports = VideoDeck;