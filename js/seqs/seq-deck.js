var _ = require('lodash');

var config = require('../config/seqs');
var getNextSequence = require('./seq-queue').getNextSequence;

function SeqDeck() {
  this.sequence = [];
  this.beats = 0;
  this.img = document.createElement('img');
  this.newSequence();
};

SeqDeck.prototype.getSequence = function(beats) {
  var sequence = getNextSequence(beats);
  
  this.beats = sequence.beats;
  this.name = sequence.folder;
  var folder = sequence.folder;

  var frames = this.beats * config.framesPerBeat;
  for(var a=0; a<frames; a++) {
    this.sequence[a] = new Image();
    this.sequence[a].src = config.path + folder + '/' + folder + '_' + ('00000' + a).slice(-5) + '.png';
  }
}

SeqDeck.prototype.getImage = function(progress) {
  var imageNum = (progress * this.beats * config.framesPerBeat)|0;
  return this.sequence[imageNum];
}

module.exports = SeqDeck;