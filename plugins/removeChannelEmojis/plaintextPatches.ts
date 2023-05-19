import { PlaintextPatch } from "replugged/dist/types";

export default [
  {
    find: /iconEmoji/,
    replacements: [
      {
        match: /return\{iconEmoji:.{1,2}.*?\}/,
        replace: (_) => `return{iconEmoji:null}`,
      },
    ],
  },
] as PlaintextPatch[];
