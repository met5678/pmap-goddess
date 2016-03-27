var _           = require('lodash');

var surfaces    = require('../surfaces');
var videos      = require('../videos');
var utils       = require('../utils');

var surfaces = {
  blindL: {
    ctx:    surfaces.blindL.ctx,
    width:  surfaces.blindL.canvas.width,
    height: surfaces.blindL.canvas.height
  },
  blindR: {
    ctx:    surfaces.blindR.ctx,
    width:  surfaces.blindR.canvas.width,
    height: surfaces.blindR.canvas.height
  }
};

function doFrame(blind, info) {
  blind.ctx.drawImage(videos[0].video,0,0);
}

function blindsFrame(info) {
  doFrame(surfaces.blindL, info);
  doFrame(surfaces.blindR, info);
};

function onFrame(info) {
  blindsFrame(info);
  videos[0].playbackRate = 1;
  videos[1].playbackRate = 1;
};

module.exports = {
  onFrame: onFrame
};