var config     = require('./config/seqs');
var SeqDeck  = require('./seqs/seq-deck');

var decks = [];
for(var a=0; a<config.decks; a++) {
  decks.push(new SeqDeck());
}

module.exports = decks;