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

function getTextX(trainer, surface) {
  let text = surface.ctx.measureText(`Team ${trainer.name}`.toUpperCase());
  return (surface.canvas.width / 2) - (text.width / 2);
}

function setup(info, battle) {
  // leftSurface  = surfaces.getSurface(0,0);
  // rightSurface = surfaces.getSurface(1,0);
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = seqDecks.getSeqDeck(battle.trainer0.clips.pose, {
    playing: false
  });
  rightDeck = seqDecks.getSeqDeck(battle.trainer1.clips.pose, {
    playing: false
  });

  leftSurface.ctx.font = '30px sans-serif';
  rightSurface.ctx.font = '30px sans-serif';

  leftTextX  = getTextX(battle.trainer0, leftSurface);
  rightTextX = getTextX(battle.trainer1, rightSurface);

  startBeat = info.beatNum;
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 8) {
    return '1-toss';
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
  let rightImage = rightDeck.getImage(progress);
  leftSurface.ctx.drawImage(leftDeck.getImage(progress), 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
  rightSurface.ctx.drawImage(rightDeck.getImage(progress), 0,0, leftSurface.canvas.width, leftSurface.canvas.height);

  leftSurface.ctx.fillStyle = battle.trainer0.color;
  rightSurface.ctx.fillStyle = battle.trainer1.color;

  leftSurface.ctx.fillText(`Team ${battle.trainer0.name}`, leftTextX, 30);
  rightSurface.ctx.fillText(`Team ${battle.trainer1.name}`, rightTextX, 30);

  leftSurface.ctx.restore();
  rightSurface.ctx.restore();
}

module.exports = {
  setup: setup,
  draw: draw
};