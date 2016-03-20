var surfaceConfigs = require('./config/surfaces');
var Surface = require('./surface');

var tilda = new Surface(surfaceConfigs.tilda);
var blindL = new Surface(surfaceConfigs.blindL);
var blindR = new Surface(surfaceConfigs.blindR);

module.exports = {
  tilda: tilda,
  blindL: blindL,
  blindR: blindR
};