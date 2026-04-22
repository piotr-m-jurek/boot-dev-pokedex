import type { ShallowLocation } from "./pokeapi";
import type { State } from "./state";

export async function commandMap(state: State) {
    const resp = await state.pokeAPI.fetchLocations(
        state.nextLocationsURL ?? undefined,
    );

    state.nextLocationsURL = resp.next;
    state.prevLocationsURL = resp.previous;

    console.log(formatLocations(resp.results));
}

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    const resp = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = resp.next;
    state.prevLocationsURL = resp.previous;

    console.log(formatLocations(resp.results));
}

function formatLocations(locations: ShallowLocation[]) {
    return locations.map((s) => s.name).join("\n");
}
