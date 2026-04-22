import type { State } from "./state";

export async function commandExplore(state: State, locationName: string) {
    console.log(`Exploring ${locationName}...`);
    const resp = await state.pokeAPI.fetchLocation(locationName);
    const pokemonNames = resp.pokemon_encounters.map(
        (encounter) => encounter.pokemon.name,
    );
    console.log("Found Pokemon:");
    console.log(pokemonNames.map((n) => `- ${n}`).join("\n"));
}
