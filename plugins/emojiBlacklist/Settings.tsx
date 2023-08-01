import { common, components, settings } from "replugged";
const { Text, TextInput, Flex, FormItem } = components;
const { React } = common;

interface Settings {
  emojiList: string;
}

export const pSettings = await settings.init<Settings>("dev.alyxia.emojiBlacklist");

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
      <FormItem
        title="Emoji blacklist"
        note="Enter your list of emojis to blacklist here. They must be comma separated values, like so: `370877996112019456,1090374917058465792,967472493667450890`"
        divider={true}>
        <Flex align={Flex.Align.CENTER} direction={Flex.Direction.HORIZONTAL}>
          {/* HACK: Wrapping the TextInput in a Flex.Child does nothing, and
          setting the flex style directly on it doesn't help either because it is
          wrapped in an `inputContainer` div. */}
          <div style={{ flex: "1 0 auto", marginRight: "20px" }}>
            <TextInput value={text} onChange={(text) => setText(text)} />
          </div>
          <Text
            tag={"h4"}
            selectable={false}
            variant="text-sm/normal"
            style={{ visibility: saved ? "visible" : "hidden" }}>
            Saved!
          </Text>
        </Flex>
      </FormItem>
    </>
  );
}
