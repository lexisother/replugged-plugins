import { pSettings } from "./Settings";

export { Settings } from "./Settings";

interface IEmoji {
  id: string;
}
export function filterEmojis(emojiList: IEmoji[]): IEmoji[] {
  const emojis = pSettings.get("emojiList", "").split(",");
  emojiList = emojiList.filter((e) => !emojis.includes(e.id));
  return emojiList;
}