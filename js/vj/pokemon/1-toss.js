'use strict';

const _           = require('lodash');
const surfaces    = require('../../surfaces');
const state       = require('../../state');
const seqDecks    = require('../../seqs');
const effects     = require('../helpers/groovy-effects');

let leftDeck, rightDeck;
let leftSurface, rightSurface;
let startBeat = 0;

function setup(info, battle) {
  // leftSurface  = surfaces.getSurface(0,0);
  // rightSurface = surfaces.getSurface(1,0);
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = seqDecks.getSeqDeck(battle.trainer0.clips.toss);
  rightDeck = seqDecks.getSeqDeck(battle.trainer1.clips.toss);

  startBeat = info.beatNum;
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 8) {
    return '2-appear';
  }

  leftSurface.clear();
  rightSurface.clear();
  leftSurface.ctx.save();
  rightSurface.ctx.save();

  effects.pulse('half',leftSurface,info);
  effects.pulse('half',rightSurface,info);

  let progress = 0;

  if(curBeat < 2) {
    progress = curBeat + info.progress;
  }

  else if(curBeat < 4) {
    progress = 2;
    progress -= (.5 - Math.abs(0.5 - info.progress));
  }
  else if(curBeat < 8) {
    progress = 2 + ((curBeat-4) + info.progress)/2;
  }
 
  progress /= 4;
  let leftImage = leftDeck.getImage(progress);
  let rightImage = rightDeck.getImage(progress);
  leftSurface.ctx.drawImage(leftDeck.getImage(progress), 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
  rightSurface.ctx.drawImage(rightDeck.getImage(progress), 0,0, leftSurface.canvas.width, leftSurface.canvas.height);

  if(curBeat == 0) {
    effects.flash(leftSurface, .35, info);
    effects.flash(rightSurface, .35, info);
  }

  leftSurface.ctx.restore();
  rightSurface.ctx.restore();
}

module.exports = {
  setup: setup,
  draw: draw
};