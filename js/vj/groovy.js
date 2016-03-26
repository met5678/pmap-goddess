var _           = require('lodash');

var surfaces    = require('../surfaces');
var videos      = require('../videos');
var transitions = require('../transitions');
var config      = require('../config/vj');
var utils       = require('../utils');
var effects     = require('./groovy-effects');

var surfaces = {
  blindL: {
    ctx:    surfaces.blindL.ctx,
    width:  surfaces.blindL.canvas.width,
    height: surfaces.blindL.canvas.height,
    deck: 0,
    odd: false
  },
  blindR: {
    ctx:    surfaces.blindR.ctx,
    width:  surfaces.blindR.canvas.width,
    height: surfaces.blindR.canvas.height,
    deck: 0,
    odd: true
  }
};

var phrase = {
  switchEach: 0,
  alternate: 0, 
  pulse: 'half',
  speedMod: 'halfbeat',
  nicki: 'none'
};

function generatePhrase() {
  phrase.switchEach = utils.pickRandom(config.groovy.switchHash);
  phrase.pulse      = utils.pickRandom(config.groovy.pulseHash);
  phrase.nicki      = utils.pickRandom(config.groovy.nickiHash);
  phrase.speedMod   = utils.pickRandom(config.groovy.speedHash);
  phrase.alternate  = Math.random() < config.groovy.alternateFrac;
  //phrase.speedMod   = Math.random() < config.groovy.speedModFrac;

  if(Math.random() < config.groovy.differentFrac) {
    surfaces.blindL.deck = 0;
    surfaces.blindR.deck = 1;
  }
  else {
    surfaces.blindL.deck = 0;
    surfaces.blindR.deck = 0;    
  }

  console.log(phrase);
}

function doBeat(blind, info) {
  if(phrase.switchEach > 0 && (info.beatNum % phrase.switchEach) == 0) {
    blind.deck = 1-blind.deck;
  }

  if(doAlternate) {
    var which = (info.beatNum % 2 + blind.odd);
    if(which % 2 != 0) {
      return;
    }
  }
}

function doFrame(blind, info) {
  var ctx = blind.ctx;
  var deck = blind.deck;

  ctx.save();
  
  effects.clearSurface(blind, info);
  effects.pulse(phrase.pulse, blind, info);

  if(phrase.speedMod == 'beat') {
    if(info.beatNum % 2 == 0) {
      videos[0].video.playbackRate = 3;
      videos[1].video.playbackRate = 3;
    }
    else {
      videos[0].video.playbackRate = .7;
      videos[1].video.playbackRate = .7;
    }
  }
  else if(phrase.speedMod == 'halfbeat') {
    var factor = Math.pow(info.progress,1);
    videos[0].video.playbackRate = 3*factor+.2;
    videos[1].video.playbackRate = 3*factor+.2;
  }
  else {
    videos[0].video.playbackRate = 1;
    videos[1].video.playbackRate = 1;
  }

  effects.nicki(phrase.nicki, blind, info);
  ctx.restore();
}

function blindsFrame(info) {  
  doFrame(surfaces.blindL, info);
  doFrame(surfaces.blindR, info);
};

function onFrame(info) {
  if(info.beat && info.beatNum % config.groovy.phraseLength == 0) {
    generatePhrase();
  }
  if(info.beat) {
    doBeat(info);
  }
  blindsFrame(info);
};

module.exports = {
  onFrame: onFrame
};