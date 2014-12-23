ids = {
  facebook: {
    clientID: '315855921958274',
    clientSecret: '6a91218dedc47bc89cf10a2ba4d2c3df',
    callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  },
  twitter: {
    consumerKey: '6l5l4vGpWZfHIABrjyGlbJ2yw',
    consumerSecret: 'rAmuG7we6nl1d3iPe6B0a5GGWa928n9QE57EuVBqbyOt2pI5TY',
    callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback'
  },
  github: {
    clientID: '649f60df206283263950',
    clientSecret: '575f07a7d84256ebeaa018ae19072ef371030413',
    callbackURL: 'http://127.0.0.1:1337/auth/github/callback'
  },
  google: {
    returnURL: 'http://127.0.0.1:1337/auth/google/callback',
    realm: 'http://127.0.0.1:1337'
  }
};

module.exports = ids
