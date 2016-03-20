var _ = require('lodash');

var config = require('../config/videos');

var videoQueue = [];

function initVideoQueue() {
  videoQueue = _.shuffle(config.files);
};

function getNextVideo() {
  if(videoQueue.length == 0) {
    initVideoQueue();
  }

  return videoQueue.shift();
};

initVideoQueue();

module.exports = {
  getNextVideo: getNextVideo
};