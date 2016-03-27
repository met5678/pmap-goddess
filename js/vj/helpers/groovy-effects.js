var state  = require('../../state');
var videos = require('../../videos');

function clearSurface(blind, info) {
  blind.ctx.clearRect(0,0,blind.width,blind.height);
  
  /*blind.ctx.globalCompositeOperation = 'normal';
  blind.ctx.fillStyle='rgba(0,0,0,.3)';
  blind.ctx.fillRect(0,0,blind.width,blind.height);

  ctx.globalCompositeOperation = 'lighten';
  ctx.drawImage(videos[deck].video,0,0);
  */
}



function pulse(type, blind, info) {
  if(type == 'full') {
    blind.ctx.globalAlpha = info.pulse;
    return;
  }
  if(type == 'half') {
    blind.ctx.globalAlpha = info.pulse*.5+.5;
    return;
  }
  blind.ctx.globalAlpha = .7;
}

function nicki(type, blind, info) {
  var ctx = blind.ctx;
  var strobeFrames = state.vjSettings.nicki.strobeFrames;
  var lengthBeats  = state.vjSettings.nicki.lengthBeats;
  var freqBeats    = state.vjSettings.nicki.freqBeats;

  if(type == 'strobe') {
    if(info.beatNum%freqBeats < lengthBeats) {
      if(info.frame%(strobeFrames*2) < strobeFrames) {
        ctx.drawImage(videos[1-blind.deck].video,0,0);
      }
      else {
        ctx.drawImage(videos[blind.deck].video,0,0);
      }
    }
    else {
      ctx.drawImage(videos[blind.deck].video,0,0);
    }
  }
  else if(type == 'beat') {
    var val = Math.pow(info.pulse,2);
    var curAlpha = ctx.globalAlpha;
    ctx.globalAlpha = curAlpha*(1-val);
    ctx.drawImage(videos[blind.deck].video,0,0);
    ctx.globalAlpha = curAlpha*val;
    ctx.drawImage(videos[1-blind.deck].video,0,0);
  }
  else {
    ctx.drawImage(videos[blind.deck].video,0,0);
  }
}

module.exports = {
  clearSurface: clearSurface,
  pulse:        pulse,
  nicki:        nicki 
};