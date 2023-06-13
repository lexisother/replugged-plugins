import { components, settings, util } from "replugged";
const { SwitchItem, FormNotice } = components;

interface Settings {
  unicode?: boolean;
}

export const pSettings = await settings.init<Settings>("dev.alyxia.removeChannelEmojis");

export function Settings(): React.ReactElement {
  return (
    <>
      <FormNotice
        title="Reload after configuring!"
        body="The below settings require a reload to take effect."
        type={FormNotice.Types.DANGER}
        style={{ marginBottom: 20 }}
      />
      <SwitchItem
        note="Also get rid of all Unicode emojis that people put in channel names."
        {...util.useSetting(pSettings, "unicode", false)}>
        Remove Unicode emojis
      </SwitchItem>
    </>
  );
}
