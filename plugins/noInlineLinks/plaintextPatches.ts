import { PlaintextPatch } from "replugged/dist/types";

export default [
  {
    find: /\.USER_PROFILE_MUTUAL_GUILDS/,
    replacements: [
      {
        match: /allowLinks:.{1,2}\.showMaskedLinks\|\|.{1,2}\.showMaskedLinks/g,
        replace: () => "allowLinks:false",
      },
    ],
  },
] as PlaintextPatch[];
