'use strict';

const _           = require('lodash');
const surfaces    = require('../surfaces');
const clips       = require('../clips');
const state       = require('../state');
const drawFunctions = require('./pokemon/*', {mode: 'hash'});

let battle = null;

function populateClips(trainer) {
  let baseTags = [ 'pokemon', trainer.tag ];
  return {
    pose:  clips.get({ tags: baseTags.concat('pose') })[0],
    toss:  clips.get({ tags: baseTags.concat('throw') })[0],
    cheer: clips.get({ tags: baseTags.concat('cheer') })[0],
    win:   clips.get({ tags: baseTags.concat('win') })[0],
    lose:  clips.get({ tags: baseTags.concat('lose') })[0]
  };
}

function generateBattle() {
  let [ trainer0, trainer1 ] = _.shuffle(state.vjSettings.trainers);

  trainer0.clips = populateClips(trainer0);
  trainer1.clips = populateClips(trainer1);

  let [ creature0, creature1 ] = _.shuffle(clips.get({
    tags: ['pokemon', 'creature']
  }));

  creature0 = {
    clip: creature0,
    name: _.without(creature0.tags, 'pokemon', 'creature')[0]
  };

  creature1 = {
    clip: creature1,
    name: _.without(creature1.tags, 'pokemon', 'creature')[0]
  };

  return {
    trainer0: trainer0,
    trainer1: trainer1,
    creature0: creature0,
    creature1: creature1,
    phase: '0-pose'
  };
}



function onFrame(info) {
  if(info.beat && !battle) {
    battle = generateBattle();
    drawFunctions[battle.phase].setup(info, battle);
  }

  if(battle) {
    let next = drawFunctions[battle.phase].draw(info, battle);
    if(next) {
      drawFunctions[battle.phase].setup(info, battle);
    }
  }

};

module.exports = {
  onFrame: onFrame
};
