import { PlaintextPatch } from "replugged/dist/types";

const __a_require = (e: string): string =>
  `window.replugged.plugins.getExports("dev.alyxia.emojiBlacklist").${e}`;

export default [
  {
    find: /.{1,2}\.searchWithoutFetchingLatest=/,
    replacements: [
      {
        match: /(return{unlocked:this\.getSearchResultsOrder\()(.{1,2}?)/,
        replace: (_, orig, container) =>
          `${container}.unlocked=${__a_require(
            "filterEmojis",
          )}(${container}.unlocked);${orig}${container}`,
      },
    ],
  },
] as PlaintextPatch[];
