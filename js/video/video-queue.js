var _ = require('lodash');
var state = require('../state');
var driver = require('../driver');
var videoQueue = [];

driver.on('presetChange',initVideoQueue);

function initVideoQueue() {
  videoQueue = _.shuffle(state.videos);
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