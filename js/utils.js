var WeightedSelection = require('random-tools').WeightedSelection;

function pickRandom(propertyHash) {
  var sel = new WeightedSelection(propertyHash);
  var pick = sel.random();
  if(pick[0] == '_') {
    return parseInt(pick.substring(1));
  }
  else {
    return pick;
  }
}

module.exports = {
  pickRandom: pickRandom
};