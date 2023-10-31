declare global {
  const cumcord: { uninject: () => void };
}

export async function start(): Promise<void> {
  eval(
    await (
      await fetch("https://raw.githubusercontent.com/Cumcord/builds/main/build.js", {
        cache: "no-store",
      })
    ).text(),
  );
}

export function stop(): void {
  cumcord?.uninject();
}
