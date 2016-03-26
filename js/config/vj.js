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
    differentFrac: .35,
    speedHash: {
      'none':0,
      'beat':0,
      'halfbeat':1
    },
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
    nickiHash: {
      'none':1,
      'beat':0,
      'strobe':0
    }
  },

  amped: {
    phraseLength: 8

  }
}