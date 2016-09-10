'use strict';

const fs     = require('fs');
const path   = require('path');
const _      = require('lodash');
const config = require('./js/config');

const clips = [];

const contentDir = config.contentDir;

function getTags(filename) {
  let tags = filename.split('-');
  _.remove(tags, (tag) => !_.isNaN(Number(tag)) );
  return tags;
}

function parseVideo(filename) {
  clips.push({
    path: path.join(contentDir, filename),
    name: filename,
    type: 'video',
    tags: getTags(filename.substring(0, filename.length-4))
  });
}

function parseSequence(filename) {
  let dirPath = path.join(contentDir, filename);
  let images = fs.readdirSync(dirPath);
  _.remove(images, (file) => !_.endsWith(file, '.png') );
  images = _.map(images, (image) => path.join(contentDir, filename, image) );

  clips.push({
    path: path.join(contentDir, filename),
    name: filename,
    images: images,
    type: 'sequence',
    length: images.length,
    tags: getTags(filename)
  });
}

function scan() {
  let files = fs.readdirSync(contentDir);
  let dir = contentDir;

  _.remove(files, (file) => file.startsWith('.'));

  let videos = _.filter(files, (file) => {
    return _.endsWith(path.join(dir, file), '.mov');
  });
  let sequences = _.filter(files, (file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });

  _.each(videos, parseVideo);
  _.each(sequences, parseSequence);
}

scan(contentDir);

fs.writeFileSync('./js/config/clips.json', JSON.stringify(clips, null, 2));