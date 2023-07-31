import { common, components, settings, webpack } from "replugged";
const { Text, TextInput, Flex } = components;
const { React } = common;

interface Settings {
  emojiList: string;
}

export const pSettings = await settings.init<Settings>("dev.alyxia.emojiBlacklist");

const Margins = webpack.getByProps([
  "marginTop8",
  "marginCenterHorz",
  "marginLarge",
  "marginBottom20",
])!;

export function Settings(): React.ReactElement {
  const emojiList = pSettings.get("emojiList", "");
  let [once, setOnce] = React.useState(false);
  let [text, setText] = React.useState(emojiList);
  let [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!once) {
      setOnce(true);
      return;
    }
    pSettings.set("emojiList", text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [text, setSaved]);

  return (
    <>
      <Text>
        Enter your list of emojis to blacklist here. They must be comma separated values, like so:
        `370877996112019456,1090374917058465792,967472493667450890`
      </Text>
      <Flex direction={Flex.Direction.HORIZONTAL} className={Margins.marginBottom20}>
        <TextInput value={text} onChange={(text) => setText(text)} />
        {saved && (
          <Text tag={"h4"} selectable={false} variant="text-sm/normal">
            Saved!
          </Text>
        )}
      </Flex>
    </>
  );
}
