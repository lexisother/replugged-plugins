export { Settings } from "./Settings";

interface IChannel {
  name: string;
}
export function transformName(channel: IChannel): IChannel {
  if (channel != null)
    if (channel.name) {
      channel.name = channel.name
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          "",
        )
        .replace(/\s+/g, " ")
        .trim();
    }
  return channel;
}
