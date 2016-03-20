var $ = require('jquery');
var surfaces = require('./surfaces');
var driver = require('./driver');
var tilda = surfaces.tilda;

//tilda.$el.append($('#tildaSVG').detach());

//var $linesGroup = $('#Paths');

driver.on('frame', function(info) {
  //$linesGroup.attr('stroke-width',5*info.pulse);
});
