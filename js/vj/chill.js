var _           = require('lodash');

var surfaces    = require('../surfaces');
var videos      = require('../videos');
var transitions = require('../transitions');
var config      = require('../config/vj');
var utils       = require('../utils');

var modes = [
  'normal',
  'mirror'
];

var swapped = true;

var surfaces = {
  blindL: {
    ctx:    surfaces.blindL.ctx,
    width:  surfaces.blindL.canvas.width,
    height: surfaces.blindL.canvas.height,
    deck: 0,
    nextTransition: 5000,
    transition: null
  },
  blindR: {
    ctx:    surfaces.blindR.ctx,
    width:  surfaces.blindR.canvas.width,
    height: surfaces.blindR.canvas.height,
    deck: 0,
    nextTransition: 10000,
    transition: null
  }  
};

function doBlind(blind, frame) {
  var ctx = blind.ctx;
  ctx.clearRect(0,0,blind.width,blind.height);

  if(blind.transition) {
    var t = blind.transition;
    var progress = (frame - t.start) / t.length;
    var oldContent = videos[blind.deck].video;
    var newContent = videos[1-blind.deck].video;
    t.func(progress, blind.ctx, oldContent, newContent);

    if(progress >= 1) {
      blind.transition = null;
      blind.deck = 1 - blind.deck;
    }
  }
  else {
    ctx.drawImage(videos[blind.deck].video,0,0);
  }
}

var nextTransition = 0;

function makeTransitions(frame) {
  nextTransition += _.random(config.chill.minDwellFrames, config.chill.maxDwellFrames);

  var transitionFunc = transitions[utils.pickRandom(config.chill.transitionHash)];
  if(_.random()) {
    surfaces.blindL.transition = {
      func: transitionFunc,
      start: frame,
      length: config.chill.transitionFrames
    };
  }
  if(_.random()) {
    surfaces.blindR.transition = {
      func: transitionFunc,
      start: frame,
      length: config.chill.transitionFrames
    };
  }
}

function blindsFrame(frame) {
  videos[0].video.playbackRate = 1;
  videos[1].video.playbackRate = 1;
  if(frame > nextTransition) {
    makeTransitions(frame);
  }

  doBlind(surfaces.blindL, frame);
  doBlind(surfaces.blindR, frame);
};

function onFrame(info) {
  blindsFrame(info.frame);
};

module.exports = {
  onFrame: onFrame
};