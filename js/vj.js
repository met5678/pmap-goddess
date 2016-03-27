var driver = require('./driver');
var vjs    = require('./vj/*.js', {mode: 'hash'});
var state  = require('./state');

driver.on('frame', function(info) {
  if(vjs[state.vj]) {
    vjs[state.vj].onFrame(info);
  }
});
