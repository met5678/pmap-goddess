const _     = require('lodash');
const clips = require('./config/clips.json');

function getClips(filter) {
  if(!filter) {
    return clips;
  }
  
  return _.filter(clips, (clip) => {
    if(filter.tags) {
      if(_.difference(filter.tags, clip.tags).length > 0) {
        return false;
      }
    }
    if(filter.type && filter.type !== clip.type) {
      return false;
    }
    return true;
  });
}

module.exports = {
  get: getClips
};