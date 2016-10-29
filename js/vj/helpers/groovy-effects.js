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

function nicki(opts, info) {
  let { surface, source0, source1, frames } = opts;

  if(info.frame%(frames*2) < frames) {
    surface.ctx.drawImage(source0, 0, 0, surface.canvas.width, surface.canvas.height);
  }
  else {
    surface.ctx.drawImage(source1, 0, 0, surface.canvas.width, surface.canvas.height);
  }
}

function strobe(surface, on, off, info) {
  if(info.frame%(on+off) < on) {
    surface.ctx.fillStyle = '#FFFFFF';
    surface.ctx.fillRect(0,0,surface.canvas.width, surface.canvas.height);
  }
}

function flash(surface, duration, info, color) {
  if(!color) {
    color = '#FFFFFF';
  }

  if(duration - info.progress > 0) {
    surface.ctx.save();
    surface.ctx.globalAlpha = 1 - (info.progress / duration);
    surface.ctx.fillStyle = color;
    surface.ctx.fillRect(0, 0, surface.canvas.width, surface.canvas.height);
    surface.ctx.restore();
  }
}

module.exports = {
  clearSurface: clearSurface,
  pulse:        pulse,
  nicki:        nicki,
  strobe:       strobe,
  flash:       flash
};