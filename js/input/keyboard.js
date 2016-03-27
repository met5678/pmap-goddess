var events = require('events');
var $ = require('jquery');
var _ = require('lodash');
var screenfull = require('screenfull');
var pulse = require('../pulse');

var ee = new events.EventEmitter();

$(document).keydown(function(e) {
  console.log(e.which);
  if(e.which == 70 && e.ctrlKey) {
    if(screenfull.enabled) {
      screenfull.request();
    }
  }
  if(e.which == 68) {
    _.each(surfaces, function(surface) {
      surface.toggleBounds();
    });
  }

  if(e.which >= 49 && e.which <= 58) {
    ee.emit('switchPreset',e.which-48);
  }

  if(e.which == 32) {
    pulse.tap();
  }
});

module.exports = ee;