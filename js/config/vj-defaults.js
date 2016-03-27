module.exports = {
  basic: {},

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
    alternateFrac: .6,
    differentFrac: .35,
    speedModFrac: .5,
    switchHash: {
      '_1': 3,
      '_2': 0,
      '_0': 5
    },
    pulseHash: {
      'full': 0,
      'half': 2,
      'none': 1
    },
    nicki: {
      strobeFrames: 3,
      lengthBeats: 2,
      freqBeats: 4
    },
    nickiHash: {
      'none':0,
      'beat':1,
      'strobe':0
    }
  },

  amped: {
    phraseLength: 8
  }
}