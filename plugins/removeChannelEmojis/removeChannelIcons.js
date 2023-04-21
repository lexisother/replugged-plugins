module.exports.patches = [
  {
    find: {
      match: 'channelEmojis:',
    },
    replace: {
      match: /channelEmojis:.{1,2}/,
      replacement: 'owo$&',
    },
  },
];

module.exports.meta = {
  name: 'Remove Channel Icons',
  description: 'Get rid of those godawful channel icons',
  authors: ['952185386350829688'],
  applications: ['discord'],
};
