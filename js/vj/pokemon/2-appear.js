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
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = seqDecks.getSeqDeck(battle.creature0.clip);
  rightDeck = seqDecks.getSeqDeck(battle.creature1.clip);

  startBeat = info.beatNum;
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 8) {
    return '3-dance';
  }

  leftSurface.clear();
  rightSurface.clear();
  leftSurface.ctx.globalAlpha = 1;
  rightSurface.ctx.globalAlpha = 1;

  let progress = 0;

  if(curBeat < 2) {
    effects.strobe(leftSurface, 2, 4, info);
    effects.strobe(rightSurface, 2, 4, info);
  }

  else if(curBeat < 8) {
    progress = curBeat-2 + info.progress;
    progress /= 4;
    let leftImage = leftDeck.getImage(Math.random());
    let rightImage = rightDeck.getImage(Math.random());

    let fade = ((curBeat + info.progress) - 2) / 6;

    leftSurface.ctx.globalAlpha = fade;
    rightSurface.ctx.globalAlpha = fade;
    leftSurface.ctx.drawImage(leftImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
    rightSurface.ctx.drawImage(rightImage, 0,0, leftSurface.canvas.width, leftSurface.canvas.height);
    
    leftSurface.ctx.globalAlpha = 1-fade;
    rightSurface.ctx.globalAlpha = 1-fade;
    effects.strobe(leftSurface, 2, 4, info);
    effects.strobe(rightSurface, 2, 4, info);
  }

}

module.exports = {
  setup: setup,
  draw: draw
};