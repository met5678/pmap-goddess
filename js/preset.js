var presets = require('../presets/*.json', {mode: 'hash'});

var current = presets.calm;

function change(name) {
  if(presets[name]) {
    current = presets[name];
  }
};

module.exports = {
  current: current,
  change: change
};