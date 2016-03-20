//var midiClock = require('./midi-clock.js');
//var socket = require('./socket.js');
var $ = require('jquery');
var _ = require('lodash');
var screenfull = require('screenfull');

var surfaces = require('./surfaces');
var vj = require('./vj');
var tilda = require('./tilda');

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

  if(e.which == 49) {
    vj.switchDJ(0);
  }
  if(e.which == 50) {
    vj.switchDJ(1);
  }
  if(e.which == 51) {
    vj.switchDJ(2);
  }
});