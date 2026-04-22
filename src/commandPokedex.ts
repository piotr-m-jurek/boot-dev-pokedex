import type { State } from "./state";

export async function commandPokedex(state: State) {
    console.log("Your Pokedex:");
    console.log(
        Object.keys(state.pokedex)
            .map((n) => `- ${n}`)
            .join("\n"),
    );
}
