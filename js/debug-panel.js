var $ = require('jquery');

var state = require('./state');
var driver = require('./driver');
var videos = require('./videos');

var $panel = $('#debug-panel');
var $beatPulse = $('#debug-beatpulse');
var $deck0 = $('#debug-deck0');
var $deck1 = $('#debug-deck1');
var $preset = $('#debug-preset');
var $vj = $('#debug-vj');
var $params = $('#debug-params');

var showing = false;

function getVideoFilename(src) {
  var parts = src.split('/');
  return parts[parts.length-1];
}

driver.on('frame', function(info) {
  if(!state.debug) {
    if(showing) {
      $panel.hide();
      showing = false;
    }
    return;
  }
  if(!showing) {
    $panel.show();
    showing = true;
  }
  $beatPulse.css('opacity',info.pulse);
  $preset.text(state.preset);
  $vj.text(state.vj);
  if(info.beat) {
    $deck0.text(getVideoFilename(videos[0].video.src));
    $deck1.text(getVideoFilename(videos[1].video.src));
  }
});
