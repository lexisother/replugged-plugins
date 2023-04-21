import { injector, webpack } from "replugged";
const { getByProps } = webpack;
const { Injector } = injector;

const ChannelNameEmojisStore = getByProps("getGuildChannelEmojis");
const patcher = new Injector();

patcher.before(ChannelNameEmojisStore, "getGuildChannelEmojis", () => {});
