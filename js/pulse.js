var Pulse = require('./foreign/pulse');
var pulse = new Pulse();
pulse.connect('http://localhost:32000');

module.exports = pulse;