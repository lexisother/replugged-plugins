import { Injector, common } from "replugged";
// """imports"""
const { parser } = common;

import "./styles.css";
const injector = new Injector();

interface State {
  prevCapture: RegExpExecArray | null;

  // sigh.
  inQuote?: boolean;
  greentext?: boolean;
}

export async function start(): Promise<void> {
  // HACK: Ew, ew, ew, ew. Just ew. This is fucking awful. Just to make the
  // users happy, it is quickly and hackily done this way, but preferably I
  // would export a list of rules (in this case just one) that I inject into SM
  // using a plaintext patch.
  injector.after(parser, "parse", (args) => {
    return parser.reactParserFor({
      greentext: {
        order: parser.defaultRules.text.order,
        // @ts-expect-error shut the fuck up
        match(text, state: State) {
          if (state.greentext || state.inQuote) return null;
          return (
            /^$|\n$/.test(state.prevCapture != null ? state.prevCapture[0] : "") &&
            /^(>.+?)(?:\n|$)/.exec(text)
          );
        },
        // @ts-expect-error the types are literally wrong here what
        parse(capture, parse, state: State) {
          state.greentext = true;
          const content = parse(capture[0], state);
          delete state.greentext;
          return { content, type: "greentext" };
        },
        react(node, recurseOutput, state) {
          return (
            <span className="replugged-greentext">
              {/* @ts-expect-error SHUT UP */}
              {recurseOutput(node.content, state)}
            </span>
          );
        },
      },
      ...parser.defaultRules,
    })(...args);
  });
}

export function stop(): void {
  injector.uninjectAll();
}
