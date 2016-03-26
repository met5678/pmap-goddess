var blackfade = function(progress, ctx, oldContent, newContent) {
  var opacity = Math.abs(0.5-progress);
  var isNewContent = progress >= 0.5;
  
  ctx.globalAlpha = opacity;
  if(isNewContent) {
    ctx.drawImage(newContent,0,0);
  }
  else {
    ctx.drawImage(oldContent,0,0);
  }
  ctx.globalAlpha = 1;
};

var whitefade = function(progress, ctx, oldContent, newContent) {
  var opacity = 1 - Math.abs(0.5-progress);

  if(progress < 0.5) {
    ctx.drawImage(oldContent,0,0);
  }
  else {
    ctx.drawImage(newContent,0,0);
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0,0,1000,1000);
};

var crossfade = function(progress, ctx, oldContent, newContent) {
  ctx.globalAlpha = 1-progress;
  ctx.drawImage(oldContent,0,0);
  ctx.globalAlpha = progress;
  ctx.drawImage(newContent,0,0);
  ctx.globalAlpha = 1;
}

module.exports = {
  crossfade: crossfade,
  blackfade: blackfade,
  whitefade: whitefade
}