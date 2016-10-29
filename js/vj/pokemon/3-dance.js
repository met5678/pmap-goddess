'use strict';

const _           = require('lodash');
const surfaces    = require('../../surfaces');
const state       = require('../../state');
const seqDecks    = require('../../seqs');
const effects     = require('../helpers/groovy-effects');

let leftDeck, rightDeck;
let leftSurface, rightSurface;
let startBeat = 0;
let clipStartBeat = 0;

function setup(info, battle) {
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = seqDecks.getSeqDeck(battle.creature0.clip);
  rightDeck = seqDecks.getSeqDeck(battle.creature1.clip);
  // leftTrainerDeck = seqDecks.getSeqDeck(battle.trainer0.clips.cheer);
  // rightTrainerDeck = seqDecks.getSeqDeck(battle.trainer1.clips.cheer);

  clipStartBeat = _.random(16);

  startBeat = info.beatNum;
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 32) {
    return '4-battle';
  }


  leftSurface.clear();
  rightSurface.clear();

  if(curBeat >= 16) {
    effects.pulse('half',leftSurface,info);
    effects.pulse('half',rightSurface,info);
  }
  else {
    leftSurface.ctx.globalAlpha = 1;
    rightSurface.ctx.globalAlpha = 1;
  }

  let progress = 0;

  if(info.beat && curBeat%4 == 0) {
    clipStartBeat = _.random(28);
  }


  progress = (curBeat%4 + clipStartBeat) / 32;
  let addProgress = 0;
  if(info.progress < .25) {
    addProgress = (info.progress / .25) * .5;
    addProgress /= 32;
  }
  else {
    addProgress = ((info.progress - .25)/.75) * .5 + .5;
    addProgress /= 32;
  }

  progress += addProgress;

  let leftImage = leftDeck.getImage(progress);
  let rightImage = rightDeck.getImage(progress);

  leftSurface.ctx.drawImage(leftImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
  rightSurface.ctx.drawImage(rightImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
  
  if(curBeat%4 == 0) {
    effects.flash(leftSurface, .25, info);
    effects.flash(rightSurface, .25, info);
  }
}

module.exports = {
  setup: setup,
  draw: draw
};