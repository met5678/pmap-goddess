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
  $deck0.text(videos[0].filename);
  $deck1.text(videos[1].filename);
});
