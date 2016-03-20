module.exports = {
  chill: {
    transitionFrames: 90,
    minDwellFrames: 300,
    maxDwellFrames: 600,
    transitionHash: {
      blackfade: 3,
      crossfade: 2
    }
  },

  groovy: {
    phraseLength: 16,
    alternateFrac: .635,
    speedModFrac: 1,
    differentFrac: .35,
    switchHash: {
      '_1': 3,
      '_2': 0,
      '_0': 5
    },
    pulseHash: {
      'full': 0,
      'half': 1,
      'none': 1
    },
    nickiHash: {
      'none':0,
      'beat':0,
      'strobe':1
    }
  },

  amped: {
    phraseLength: 8

  }
}