var _ = require('lodash');

function SeqDeck(clip) {
  if(clip.type !== 'sequence') {
    throw 'Error: Tried to create sequence deck with non-sequence clip'
  }
  this.clip = clip;
  this.sequence = new Array(clip.length);
  this.preload(0,10);
};

SeqDeck.prototype.preload = function(frame, pad) {
  for(let a=frame; a<frame+pad && a<this.clip.length; a++) {
    if(!this.sequence[a]) {
      this.sequence[a] = new Image();
      this.sequence[a].src = `file://${this.clip.images[a]}`;
    }
  }
}

SeqDeck.prototype.getImage = function(progress) {
  let index = Math.floor(progress * this.sequence.length);
  if(index >= this.sequence.length) {
    index = this.sequence.length-1;
  }
  this.preload(index, 10);
  return this.sequence[index];
}

module.exports = SeqDeck;