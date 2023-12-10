import { PlaintextPatch } from "replugged/dist/types";
import { pSettings } from "./Settings";

const __a_require = (e: string): string =>
  `window.replugged.plugins.getExports("dev.alyxia.removeChannelEmojis").${e}`;

export default [
  {
    find: {
      match: 'ChannelItemIcon:',
    },
    replace: {
      match: /(?<=useChannelEmojiAndColor\)\(.+?\),.+?=).+?null/, // ty rosalie
      replacement: 'null',
    },
  },
  ...(pSettings.get("unicode")
    ? ([
        {
          find: /.{1,2}.displayName="ChannelStore";/,
          replacements: [
            {
              match:
                /([^;]{1,2}\.getChannel=function\([^)]*\)\{)if\(null!=(.{1,2})\)return ([^(]{1,2})\(.{1,2}\)/,
              replace: (_, def, channelId, func) =>
                `${def}if(null!=e)return ${__a_require("transformName")}(${func}(${channelId}))`,
            },
          ],
        },
      ] as PlaintextPatch[]) // required typehint due to conditional
    : []),
] as PlaintextPatch[];
