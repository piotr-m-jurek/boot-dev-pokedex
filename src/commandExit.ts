import type { State } from "./state";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.face.close();
    process.exit(0);
}
