const SeqDeck    = require('./seqs/seq-deck');

let decks = [];

function getSeqDeck(clip) {
  let deck = new SeqDeck(clip);
  decks.push(deck);
  return deck;
}

function clearDecks() {
  decks = [];
}

module.exports = {
  getSeqDeck: getSeqDeck,
  clearDecks: clearDecks
};