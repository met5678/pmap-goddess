var preset = require('./preset');

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
  if(phrase.pulse == 'full') {
    ctx.globalAlpha = info.pulse;
    return;
  }
  if(phrase.pulse == 'half') {
    blind.ctx.globalAlpha = info.pulse*.5+.5;
    return;
  }
  blind.ctx.globalAlpha = .7;
}

function nicki(type, blind, info) {
  if(phrase.nicki == 'strobe') {
    if(info.beatNum%4 <= 1) {
      if(info.frame%6 <= 2) {
        ctx.drawImage(videos[1-blind.deck].video,0,0);
      }
      else {
        ctx.drawImage(videos[blind.deck].video,0,0);
      }
    }
    else {
    }
  }
  else if(phrase.nicki == 'beat') {
    var val = Math.pow(info.pulse,2);
    ctx.globalAlpha = 1-val;
    ctx.drawImage(videos[blind.deck].video,0,0);
    ctx.globalAlpha = val;
    ctx.drawImage(videos[1-blind.deck].video,0,0);
  }
  else {
    ctx.drawImage(videos[blind.deck].video,0,0);
  }
}

module.exports = {
  clearSurface: clearSurface,
  pulse:        pulse 
};