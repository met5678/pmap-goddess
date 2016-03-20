var _ = require('lodash');

var config = require('../config/seqs');

var sequenceQueues = [ [], [] ];

function initSequenceQueue(index) {
  sequenceQueues[index] = _.filter(config.sequences,
    { beats: Math.pow(2,index) });
  sequenceQueues[index] = _.shuffle(sequenceQueues[index]);
};

function getNextSequence(beats) {
  if(beats) {
    var index = Math.log2(beats);
  }
  else {
    var index = _.random(0,1);
  }

  if(sequenceQueues[index].length == 0) {
    initSequenceQueue(index);
  }

  return sequenceQueues[index].shift();
};

module.exports = {
  getNextSequence: getNextSequence
};