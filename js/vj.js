var driver = require('./driver');

var vjs = require('vj/*.js', {mode: 'hash'});

function switchDJ(name) {
  if(vjs[name]) {
    curVJ = vjs[name];
  }
};

driver.on('frame', function(info) {
  if(curVJ >= 0) {
    vjs[curVJ].onFrame(info);
  }
});

module.exports = {
  switchDJ: switchDJ
};