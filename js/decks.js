'use strict';

const _       = require('lodash');
const seqDeck = require('./seqs/seq-deck');
const vidDeck = require('./video/video-deck');

let currentDecks = [];

function getDeck(clips, options) {
  if(!_.isArray(clips)) {
    clips = [clips];
  }


}




/*
Deck looks like this:
{
  randomize: false
  autoplay:  false,
  loop:      false,
  canScrub:  false,
  type: 'video', 'imgSeq',
  clip: {
    name: '',
    frames: '',
    duration: ''
  },
  element: null,

  play(),
  stop(),
  rate(),
  pos(),
  next()

}
*/