var _        = require('lodash');
var presets  = require('../presets/*.json', {mode: 'hash'});
var state    = require('./state');
var defaults = require('./config/vj-defaults');
var events   = require('events');
var ee = new events.EventEmitter();

var current = {};

function change(name) {
  if(presets[name]) {
    current = presets[name];
    state.preset = name;
    state.vj = current.vj.name;
    state.vjSettings = _.assign(defaults[state.vj], current.vj.settings);
    state.videos = current.videos;
  }
};

function changeKey(key) {
  var preset = _.find(presets, function(preset, name) {
    if(key == preset.numKey) {
      console.log(name);
      change(name);
    }
  });
};

change('rain');

module.exports = {
  change:    change,
  changeKey: changeKey
};