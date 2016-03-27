var surfaceConfigs = require('./config/surfaces');
var Surface = require('./surface');

var weather = new Surface(surfaceConfigs.weather);
var blindL = new Surface(surfaceConfigs.blindL);
var blindR = new Surface(surfaceConfigs.blindR);

module.exports = {
  weather: weather,
  blindL: blindL,
  blindR: blindR
};