'use strict';

const _           = require('lodash');
const surfaces    = require('../../surfaces');
const state       = require('../../state');
const decks       = require('../../decks');

let leftDeck, rightDeck;
let leftSurface, rightSurface;
let startBeat = 0;

function setup(info, battle) {
  // leftSurface  = surfaces.getSurface(0,0);
  // rightSurface = surfaces.getSurface(1,0);
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = decks.getDeck(battle.trainer0.clips.pose, {
    playing: false
  });
  rightDeck = decks.getDeck(battle.trainer1.clips.pose, {
    playing: false
  });

  startBeat = info.beatNum;
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 2) {
    let progress = curBeat + info.progress;
    leftSurface.ctx.drawImage(leftDeck.getImage(progress));
    rightSurface.ctx.drawImage(rightDeck.getImage(progress));
  }
  else if(curBeat < 4) {
    let progress = 4 - (curBeat + info.progress);
    leftSurface.ctx.drawImage(leftDeck.getImage(progress));
    rightSurface.ctx.drawImage(rightDeck.getImage(progress));    
  }
}

module.exports = {
  setup: setup,
  draw: draw
};