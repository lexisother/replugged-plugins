import { common, components, settings, webpack } from "replugged";
const { Text, TextInput, Flex, FormItem, Button } = components;
const { React } = common;

const Margins = webpack.getByProps(
  ["marginTop8", "marginCenterHorz", "marginLarge", "marginBottom20"],
  { all: false, raw: false },
)!;

interface Settings {
  emojiList: string;
}

export const pSettings = await settings.init<Settings>("dev.alyxia.emojiBlacklist");

export function Settings(): React.ReactElement {
  // These two are never touched after initialization, use the list state for this!!!
  const emojiList = pSettings.get("emojiList", "");
  const emojiObject = emojiList.split(",").map((e) => ({ text: e, id: Math.random() }));

  let [list, setList] = React.useState(emojiObject);
  let [once, setOnce] = React.useState(false);
  let [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!once) {
      setOnce(true);
      return;
    }
    pSettings.set("emojiList", list.map((e) => e.text).join(","));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [list, setSaved]);

  const inputFields = React.useMemo(
    () =>
      list.map((emoji, i) => (
        <Flex
          key={`${emoji.id}`}
          direction={Flex.Direction.HORIZONTAL}
          className={Margins.marginBottom20 as string}>
          <Flex.Child shrink={0} basis="99%">
            {/* HACK: Wrapping the TextInput in a Flex.Child does nothing, and
              setting the flex style directly on it doesn't help either because it is
              wrapped in an `inputContainer` div. */}
            <div style={{ flex: "1 0 auto" }}>
              <TextInput
                value={list[i].text}
                error={!/^\d{17,19}$/.test(emoji.text) ? "Invalid ID" : ""}
                onChange={(text) => {
                  setList(list.map((val) => (val.id === emoji.id ? { ...val, text } : val)));
                }}
              />
            </div>
          </Flex.Child>
          <Flex.Child grow={0} basis="1%">
            <Button
              hover={Button.Hovers.RED}
              look={Button.Looks.OUTLINED}
              color={Button.Colors.LINK}
              style={{ minWidth: "unset" }}
              onClick={() => {
                setList(list.filter((val) => emoji.id !== val.id));
              }}>
              {"\u00d7"}
            </Button>
          </Flex.Child>
        </Flex>
      )),
    [list, setList],
  );

  return (
    <>
      <FormItem
        title="Emoji blacklist"
        note="Enter your list of emojis to blacklist here. They must be comma separated values, like so: `370877996112019456,1090374917058465792,967472493667450890`"
        divider={true}>
        <Text
          tag={"h4"}
          selectable={false}
          variant="text-sm/normal"
          style={{ visibility: saved ? "visible" : "hidden" }}>
          Saved!
        </Text>
        <Flex direction={Flex.Direction.VERTICAL}>
          {inputFields}

          <Button
            look={Button.Looks.FILLED}
            color={Button.Colors.GREEN}
            onClick={() => {
              setList([...list, { id: Math.random(), text: "" }]);
            }}>
            Add new entry
          </Button>
        </Flex>
      </FormItem>
    </>
  );
}
