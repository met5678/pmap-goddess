/*
var _           = require('lodash');

var surfaces    = require('../surfaces');
var seqs        = require('../seqs');
var config      = require('../config/vj');
var utils       = require('../utils');
//var $           = require('jquery');

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


var ampedFunctions = {
  'scrub': {
    setup: function() {
      seqs[0].newSequence(1);
      seqs[1].newSequence(1);
      seqs[2].newSequence(1);
      seqs[3].newSequence(1);
    },
    calc: function(info) {
      return {
        prog: Math.abs(0.5 - info.progress)*2,
        deck: info.beatNum % 4
      }
    }
  },
  'scrub2': {
    setup: function() {
      seqs[0].newSequence(1);
      seqs[1].newSequence(1);
      seqs[2].newSequence(1);
      seqs[3].newSequence(1);
    },
    calc: function(info) {
      return {
        prog: Math.abs(0.5 - info.progress)*2,
        deck: ((info.beatNum % 8)/2)|0
      }
    }
  }
};

var phraseFunc = ampedFunctions['scrub2'];


function generatePhrase() {
  phraseFunc.setup();
}

function doBlind(blind, info) {
  var ctx = blind.ctx;
  ctx.clearRect(0,0,blind.width,blind.height);

  var obj = phraseFunc.calc(info);

  //ctx.globalAlpha = .4 + info.pulse*.6;
  //$('#whichGif').html(seqs[obj.deck].name);

  try { ctx.drawImage(seqs[obj.deck].getImage(obj.prog),0,0); } catch(e) {}
  ctx.globalAlpha = 1;
}

function blindsFrame(info) {  
  doBlind(surfaces.blindL, info);
  doBlind(surfaces.blindR, info);
};

function onFrame(info) {
  if(info.beat && info.beatNum % config.amped.phraseLength == 0) {
    generatePhrase();
  }
  blindsFrame(info);
};

module.exports = {
  onFrame: onFrame
};
*/