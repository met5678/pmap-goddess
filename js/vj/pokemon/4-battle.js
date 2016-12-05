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
let turn = 0;
let damagePerBeat = 2;
let battleFunction = null;
let battleFunctions = [
  function scrubber(curBeat, info, surface, deck) {
    surface.clear();
    if(curBeat < 2) {
      let progress = (0.5 - Math.abs(0.5 - info.progress))*2;
      progress += clipStartBeat;
      progress /= 32;
      let image = deck.getImage(progress);
      surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);
    }
    else if(curBeat < 4) {
      let progress = (0.25 - Math.abs(0.25 - info.progress%.5))*4;
      progress += clipStartBeat + 2;
      progress /= 32;
      let image = deck.getImage(progress);
      surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);      
    }
    else if(curBeat < 6) {
      let progress = (0.5 - Math.abs(0.5 - info.progress))*2;
      progress += clipStartBeat + 4;
      progress /= 32;
      let image = deck.getImage(progress);
      surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);
    }
    else {
      let progress = (0.25 - Math.abs(0.25 - info.progress%.5))*4;
      progress += clipStartBeat + 6;
      progress /= 32;
      let image = deck.getImage(progress);
      surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);            
    }
  },
  function nickiAttack(curBeat, info, surface, deck) {
    surface.clear();
    let oldProgress = (curBeat + info.progress)/2;
    let newProgress = oldProgress + 4;
    oldProgress /= 32;
    newProgress /= 32;
    if(curBeat % 4 < 2) {
      effects.nicki({
        surface: surface,
        source0: deck.getImage(oldProgress),
        source1: deck.getImage(newProgress),
        frames: 2
      }, info);
    }
    else {
      let image = deck.getImage(oldProgress);
      surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);
    }
  }/*,
  function manyAttack(curBeat, info, surface, deck) {
    surface.clear();
    let progress = (curBeat + info.progress)/2;
    progress /= 32;

    surface.ctx.drawImage
  }*/

]

function setup(info, battle) {
  leftSurface  = surfaces.blindL;
  rightSurface = surfaces.blindR;

  leftDeck = seqDecks.getSeqDeck(battle.creature0.clip);
  rightDeck = seqDecks.getSeqDeck(battle.creature1.clip);
  // leftTrainerDeck = seqDecks.getSeqDeck(battle.trainer0.clips.cheer);
  // rightTrainerDeck = seqDecks.getSeqDeck(battle.trainer1.clips.cheer);

  clipStartBeat = _.random(24);
  turn = 1 - turn;
  damagePerBeat = (function() {
    if(Math.random() < .5) {
      return _.random(5,7,true);
    }
    else {
      return _.random(1,2.5,true);
    }
  })();
  battleFunction = battleFunctions[_.random(battleFunctions.length-1)];

  startBeat = info.beatNum;
}

function drawDefender(curBeat, info, surface, deck) {
  surface.clear();
  surface.ctx.globalAlpha = .3;
  let progress = (curBeat + info.progress) / 2;
  progress += clipStartBeat;
  progress /= 32;
  let image = deck.getImage(progress);
  surface.ctx.drawImage(image, 0, 0, surface.canvas.width, surface.canvas.height);            
}

function drawHealth(battle, surface, creature) {
  surface.ctx.fillStyle = '#CC3333';
  surface.ctx.fillRect(
    30,
    surface.canvas.height-50,
    surface.canvas.width-30,
    20);
  surface.ctx.fillStyle = '#33CC33';
  surface.ctx.fillRect(
    30,
    surface.canvas.height-50,
    (surface.canvas.width-30)*(creature.hp/100),
    20);

  surface.ctx.strokeStyle = '#FFFFFF';
  surface.ctx.strokeWidth = 6;
  surface.ctx.strokeRect(
    30,
    surface.canvas.height-50,
    surface.canvas.width-30,
    20);
}

function checkWinner(info, battle) {
  if(battle.creature0.hp <= 0) {
    battle.creature0.winner = true;
    battle.trainer0.winner = true;
    return true;
  }
  else if(battle.creature1.hp <= 0) {
    battle.creature1.winner = true;
    battle.trainer1.winner = true;
    return true;
  }
}

function draw(info, battle) {
  let curBeat = info.beatNum - startBeat;
  if(curBeat < 0) {
    setup(info,battle);
    curBeat = info.beatNum - startBeat;
  }
  if(curBeat >= 8) {
    if(checkWinner(info, battle)) {
      battle.ended = true;
      return '2-appear';
    }
    else {
      setup(info,battle);
    }
  }

  if(turn) {
    battleFunction(curBeat, info, leftSurface, leftDeck);
    drawDefender(curBeat, info, rightSurface, rightDeck);
  }
  else {
    battleFunction(curBeat, info, rightSurface, rightDeck);
    drawDefender(curBeat, info, leftSurface, leftDeck);
  }

  if(info.beat) {
    if(turn) {
      battle.creature1.hp -= damagePerBeat;
      if(battle.creature1.hp < 0) {
        battle.creature1.hp = 0;
      }
    }
    else {
      battle.creature0.hp -= damagePerBeat;
      if(battle.creature0.hp < 0) {
        battle.creature0.hp = 0;
      }
    }
  }

  leftSurface.ctx.globalAlpha = 1;
  rightSurface.ctx.globalAlpha = 1;

  // drawHealth(battle, leftSurface, battle.creature0);
  // drawHealth(battle, rightSurface, battle.creature1);

  if(curBeat === 0) {
    effects.flash(leftSurface, .25, info);
    effects.flash(rightSurface, .25, info);
  }
}

module.exports = {
  setup: setup,
  draw: draw
};