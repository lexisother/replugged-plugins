import { PlaintextPatch } from "replugged/dist/types";

export default [
  {
    find: /.{1,2}\.getGuildChannelEmojis/,
    replacements: [
      {
        match: /(.{1,2}\.getGuildChannelEmojis)=function\(.\){.*?}/,
        replace: (_, def) => `${def}=function() {}`,
      },
    ],
  },
] as PlaintextPatch[];
