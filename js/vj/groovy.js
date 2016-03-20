var _           = require('lodash');

var surfaces    = require('../surfaces');
var videos      = require('../videos');
var transitions = require('../transitions');
var config      = require('../config/vj');
var utils       = require('../utils');

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
  speedMod: 1,
  nicki: 'strobe'
};

function generatePhrase() {
  phrase.switchEach = utils.pickRandom(config.groovy.switchHash);
  phrase.pulse      = utils.pickRandom(config.groovy.pulseHash);
  phrase.nicki      = utils.pickRandom(config.groovy.nickiHash);
  phrase.alternate  = Math.random() < config.groovy.alternateFrac;
  phrase.speedMod   = Math.random() < config.groovy.speedModFrac;

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


function doBlind(blind, info) {
  var ctx = blind.ctx;
  ctx.clearRect(0,0,blind.width,blind.height);

  if(phrase.nicki == 'strobe') {
    if(info.beatNum%4 <= 1) {
      if(info.frame%6 <= 2) {
        ctx.drawImage(videos[1-blind.deck].video,0,0);
      }
      else {
        ctx.drawImage(videos[blind.deck].video,0,0);
      }
    }
    else {
      ctx.drawImage(videos[blind.deck].video,0,0);
    }
  }

  if(phrase.nicki == 'beat') {
    if(info.progress < 0.5) {
      ctx.drawImage(videos[1-blind.deck].video,0,0);
    }
    else {
      ctx.drawImage(videos[blind.deck].video,0,0);
    }
  }

  

  /*if(info.beat) {
    // Switch deck
    if(phrase.switchEach > 0 && (info.beatNum % phrase.switchEach) == 0) {
      blind.deck = 1-blind.deck;
    }
  }

  if(phrase.pulse != 'none') {
    if(phrase.pulse == 'half') {
      ctx.globalAlpha = info.pulse*.7+.3;
    }
    else {
      if(phrase.alternate) {
        var doAlternate = true;
      }
      ctx.globalAlpha = info.pulse;
    }
  }
  else {
    ctx.globalAlpha = .7;
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

  if(doAlternate) {
    var which = (info.beatNum % 2 + blind.odd);
    if(which % 2 == 0) {
     ctx.drawImage(videos[blind.deck].video,0,0);
    }
  }
  else {
    ctx.drawImage(videos[blind.deck].video,0,0);
  }*/
  ctx.globalAlpha = 1;
}

function blindsFrame(info) {  
  doBlind(surfaces.blindL, info);
  doBlind(surfaces.blindR, info);
};

function onFrame(info) {
  if(info.beat && info.beatNum % config.groovy.phraseLength == 0) {
    generatePhrase();
  }
  blindsFrame(info);
};

module.exports = {
  onFrame: onFrame
};