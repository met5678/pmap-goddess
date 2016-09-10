const fs     = require('fs');
const path   = require('path');
const config = require('./config');
const _      = require('lodash');

const clips = [];

const contentDir = config.get('contentDir');

function getTags(filename) {
  let tags = filename.split('-');
  _.remove(tags, (tag) => { !_.isNan(tag); });
  return tags;
}

function parseVideo(filename) {
  clips.push({
    path: path.join(contentDir, filename),
    type: 'video',
    tags: getTags(filename.substring(0, filename.length-4))
  });
}

function parseSequence(filename) {
  let dirPath = path.join(contentDir, filename);
  let images = fs.readdirSync(dirPath);

  clips.push({

    type: 'sequence',
  })
}

function scan() {
  let files = fs.readdirSync(contentDir);
  _.remove(files, (file) => file.startsWith('.'));

  let videos = _.filter(files, (file) => {
    return _.endsWith(path.join(dir, file), '.mp4')
  });
  let sequences = _.filter(files, (file) => {
    return fs.statSync(path.join(dir, file).isDirectory()
  });

  _.each(videos, parseVideo);
  _.each(sequences, parseSequence);
}

scan(contentDir);

module.exports = clips;