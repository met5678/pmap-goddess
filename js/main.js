var videos   = require('./videos');
var surfaces = require('./surfaces');
var vj       = require('./vj');
var presets  = require('./presets');
var keyboard = require('./input/keyboard');
var debug    = require('./debug-panel');

keyboard.on('switchPreset',presets.changeKey);