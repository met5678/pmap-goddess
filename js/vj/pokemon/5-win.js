'use strict';

const _           = require('lodash');
const surfaces    = require('../../surfaces');
const state       = require('../../state');
const seqDecks    = require('../../seqs');
const effects     = require('../helpers/groovy-effects');

let leftDeck, rightDeck;
let leftSurface, rightSurface;
let startBeat = 0;

let leftTextX = 0;
let rightTextX = 0;

let trainer = null;

function getTextX(trainer, surface) {
  let text = surface.ctx.measureText(`Team ${trainer.name} wins`.toUpperCase());
  return (surface.canvas.width / 2) - (text.width / 2);
}

function setup(info, battle) {
  // leftSurface  = surfaces.getSurface(0,0);
  // rightSurface = surfaces.getSurface(1,0);
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  trainer = (function() {
    if(battle.trainer0.winner) {
      return battle.trainer0;
    }
    else {
      return battle.trainer1;
    }
  })();

  leftDeck = seqDecks.getSeqDeck(trainer.clips.win, {
    playing: false
  });

  leftSurface.ctx.font = '30px sans-serif';
  rightSurface.ctx.font = '30px sans-serif';



  leftTextX  = getTextX(trainer, leftSurface);
  rightTextX = getTextX(trainer, rightSurface);

  startBeat = info.beatNum;
}

function draw(info, battle) {

  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 8) {
    battle.ended = true;
    return '0-pose';
  }

  leftSurface.clear();
  rightSurface.clear();
  leftSurface.ctx.save();
  rightSurface.ctx.save();

  effects.pulse('half',leftSurface,info);
  effects.pulse('half',rightSurface,info);

  let progress = 0;
  if(curBeat < 2) {
    progress = (curBeat + info.progress);
  }
  else if(curBeat < 4) {
    progress = (4 - (curBeat + info.progress));
  }
  else if(curBeat < 5) {
    progress = info.progress;
  }
  else if(curBeat < 7) {
    progress = 1;
    progress += (.5 - Math.abs(0.5 - info.progress));
  }
  else if(curBeat < 8) {
    progress = 1 + info.progress;
  }
 
  progress /= 2;
  let leftImage = leftDeck.getImage(progress);
  leftSurface.ctx.drawImage(leftImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
  rightSurface.ctx.drawImage(leftImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);

  leftSurface.ctx.fillStyle = trainer.color;
  rightSurface.ctx.fillStyle = trainer.color;

  leftSurface.ctx.fillText(`Team ${trainer.name} wins`, leftTextX, 30);
  rightSurface.ctx.fillText(`Team ${trainer.name} wins`, rightTextX, 30);

  leftSurface.ctx.restore();
  rightSurface.ctx.restore();
}

module.exports = {
  setup: setup,
  draw: draw
};