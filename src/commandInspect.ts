import type { Pokemon } from "./pokedex.types";
import type { State } from "./state";

export async function commandInspect(state: State, pokemonName: string) {
    const lookup = state.pokedex[pokemonName];
    if (!lookup) {
        console.log("you have not caught that pokemon");
    }
    console.log("Name:", lookup.name);
    console.log("Height:", lookup.height);
    console.log("Weight:", lookup.weight);
    console.log(formatStats(lookup));
    console.log(formatTypes(lookup));
}

function formatStats(pokemon: Pokemon) {
    console.log("Stats:");
    console.log(
        pokemon.stats
            .map((stat) => `- ${stat.stat.name}: ${stat.base_stat}`)
            .join("\n"),
    );
}

function formatTypes(pokemon: Pokemon) {
    console.log("Types:");
    console.log(pokemon.types.map((t) => `- ${t.type.name}`).join("\n"));
}
