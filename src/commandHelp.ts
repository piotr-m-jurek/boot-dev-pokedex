import type { State } from "./state";

export async function commandHelp({ commands }: State) {
    console.log(
        [
            "Welcome to the Pokedex!\n",
            "Usage:\n",
            Object.values(commands)
                .map((command) => `${command.name}: ${command.description}`)
                .join("\n"),
        ].join(""),
    );
}
