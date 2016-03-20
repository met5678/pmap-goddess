var events = require('events');
var Pulse = require('./foreign/pulse');

var pulse = new Pulse();
pulse.connect('http://localhost:32000');

var ee = new events.EventEmitter();

var frame = 0;
var isPlaying = true;

var curBeat = 0;
function doFrame() {
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
  if(isPlaying) {
    requestAnimationFrame(doFrame);
  }
}

function play() {
  isPlaying = true;
  requestAnimationFrame(doFrame);
}

function pause() {
  isPlaying = false;
}

doFrame();

module.exports = ee;