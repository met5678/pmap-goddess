var driver = require('./driver');

var vjChill  = require('./vj/chill');
var vjGroovy = require('./vj/groovy');
var vjAmped  = require('./vj/amped');

var vjs = [ vjChill, vjGroovy, vjAmped ];
var curVJ = -1;

function switchDJ(index) {
  if(index == -1) {
    curVJ = -1;
    return;
  }
  if(typeof index == 'number') {
    curVJ = index % vjs.length;
  }
  else {
    curVJ = (curVJ+1) % vjs.length;
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