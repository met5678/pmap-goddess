var events = require('events');
var ee = new events.EventEmitter();

var Pulse = require('./foreign/pulse');
var pulse = new Pulse();
pulse.connect('http://localhost:32000');
var state = require('./state');

var frame = 0;
var curBeat = 0;
var curPreset = '';

function doFrame() {
  if(state.preset != curPreset) {
    ee.emit('presetChange');
    curPreset = state.preset;
  }

  var beat = pulse.beat();
  var beatNum = beat|0;

  if(beatNum <= 1) {
    curBeat = beatNum;
  }
  if(beatNum > curBeat) {
    var isBeat = true;
    curBeat = beatNum;
  }
  else {
    var isBeat = false;
  }

  
  var info = {
    frame: frame,
    beat: isBeat,
    beatNum: beat|0,
    progress: beat%1,
    pulse: pulse.pulse()
  }
  ee.emit('frame', info);

  frame++;
  requestAnimationFrame(doFrame);
}

doFrame();

module.exports = ee;