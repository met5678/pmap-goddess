var _           = require('lodash');

var surfaces    = require('../surfaces');
var videos      = require('../videos');
var utils       = require('../utils');
var effects     = require('./helpers/groovy-effects');
var state       = require('../state');

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
  speedMod: 0,
  nicki: 'strobe'
};

function generatePhrase() {
  var params = state.vjSettings;

  phrase.switchEach = utils.pickRandom(params.switchHash);
  phrase.pulse      = utils.pickRandom(params.pulseHash);
  phrase.nicki      = utils.pickRandom(params.nickiHash);
  phrase.alternate  = Math.random() < params.alternateFrac;
  phrase.speedMod   = Math.random() < params.speedModFrac;

  if(Math.random() < params.differentFrac) {
    surfaces.blindL.deck = 0;
    surfaces.blindR.deck = 1;
  }
  else {
    surfaces.blindL.deck = 0;
    surfaces.blindR.deck = 0;    
  }

  console.log(phrase);
}

function doBeat(info) {
  if(phrase.switchEach > 0 && (info.beatNum % phrase.switchEach) == 0) {
    surfaces.blindL.deck = 1-surfaces.blindL.deck;
    surfaces.blindR.deck = 1-surfaces.blindR.deck;
  }

  if(phrase.speedMod) {
    if(info.beatNum % 2 == 0) {
      videos[0].video.playbackRate = 3;
      videos[1].video.playbackRate = 3;
    }
    else {
      videos[0].video.playbackRate = .7;
      videos[1].video.playbackRate = .7;
    }
  }
  else {
    videos[0].video.playbackRate = 1;
    videos[1].video.playbackRate = 1;
  }
}

function doFrame(blind, info) {
  var ctx = blind.ctx;
  ctx.save();
  
  effects.clearSurface(blind, info);

  if(phrase.alternate) {
    var which = (info.beatNum % 2 + blind.odd);
    if(which % 2 != 0) {
      return;
    }
  }
  effects.pulse(phrase.pulse, blind, info);
  effects.nicki(phrase.nicki, blind, info);

  ctx.restore();
}

function blindsFrame(info) {
  doFrame(surfaces.blindL, info);
  doFrame(surfaces.blindR, info);
};

function onFrame(info) {
  if(info.beat && info.beatNum % state.vjSettings.phraseLength == 0) {
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