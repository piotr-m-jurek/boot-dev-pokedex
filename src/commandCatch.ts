import type { State } from "./state";

export async function commandCatch(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    if (Math.random() > 0.2) {
        console.log(`${pokemonName} escaped!`);
        return;
    }

    const resp = await state.pokeAPI.fetchPokemon(pokemonName);
    state.pokedex[pokemonName] = resp;

    console.log(`${pokemonName} was caught!`);
}
