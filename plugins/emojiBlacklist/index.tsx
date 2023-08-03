import { Injector, components, types } from "replugged";
import { pSettings } from "./Settings";

const {
  ContextMenu: { MenuItem },
} = components;
const { ContextMenuTypes } = types;

const injector = new Injector();

interface IEmoji {
  id: string;
  uniqueName: string;
}
interface MenuItemData {
  target?: {
    dataset: {
      name: string;
      id: string;
    };
  };
}

export function filterEmojis(emojiList: IEmoji[]): IEmoji[] {
  const emojis = pSettings.get("emojiList", "").split(",");
  emojiList = emojiList.filter((e) => !emojis.includes(e.id) && !emojis.includes(e.uniqueName));
  return emojiList;
}

export function start(): void {
  injector.utils.addMenuItem(ContextMenuTypes.ExpressionPicker, (data: MenuItemData) => (
    <MenuItem
      id="blacklist"
      label="Blacklist"
      action={() => {
        const emojis = pSettings.get("emojiList", "").split(",");
        emojis.push(data.target!.dataset.id ?? data.target!.dataset.name);
        pSettings.set("emojiList", emojis.join(","));
      }}
    />
  ));
}

export const stop = (): void => injector.uninjectAll();

export { Settings } from "./Settings";
