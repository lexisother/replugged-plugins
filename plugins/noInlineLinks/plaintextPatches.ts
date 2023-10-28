import { PlaintextPatch } from "replugged/dist/types";

export default [
  {
    find: /childrenExecutedCommand:/,
    replacements: [
      {
        match: /allowLinks:.{1,2}\.showMaskedLinks\|\|.{1,2}\.showMaskedLinks/g,
        replace: () => "allowLinks:false",
      },
    ],
  },
] as PlaintextPatch[];
