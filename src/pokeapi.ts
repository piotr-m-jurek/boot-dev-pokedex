import type { LocationArea } from "./pokeapi.types";
import { Cache } from "./pokecache";
import { Pokemon } from "./pokedex.types";

export type ShallowLocation = {
    name: string;
    url: string;
};

class ResponseNotOkError extends Error {}
class JSONParseError extends Error {}

type FetchLocationsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ShallowLocation[];
};

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache: Cache;

    constructor() {
        this.cache = new Cache(60_000);
    }

    async fetchLocations(pageURL?: string): Promise<FetchLocationsResponse> {
        const uri = pageURL ?? [PokeAPI.baseURL, "location-area"].join("/");
        const cached = this.cache.get(uri);
        if (cached) {
            return Promise.resolve(cached as unknown as FetchLocationsResponse);
        }

        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new ResponseNotOkError(response.statusText);
            }

            const json = await response
                .json()
                .catch((e) => new JSONParseError(e.message));
            this.cache.add(uri, json);
            return json as FetchLocationsResponse;
        } catch {
            throw new Error("unexpected error fetching locations");
        }
    }

    async fetchLocation(locationName: string): Promise<LocationArea> {
        const uri = [PokeAPI.baseURL, "location-area", locationName].join("/");
        const cached = this.cache.get(uri);
        if (cached) {
            return Promise.resolve(cached as unknown as LocationArea);
        }

        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new ResponseNotOkError(response.statusText);
            }
            const json = await response
                .json()
                .catch((e) => new JSONParseError(e.message));
            this.cache.add(uri, json);
            return json as LocationArea;
        } catch {
            throw new Error("unexpected error fetching locations");
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const uri = [PokeAPI.baseURL, "pokemon", pokemonName].join("/");
        const cached = this.cache.get(uri);
        if (cached) {
            return Promise.resolve(cached as unknown as Pokemon);
        }

        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new ResponseNotOkError(response.statusText);
            }
            const json = await response
                .json()
                .catch((e) => new JSONParseError(e.message));
            this.cache.add(uri, json);
            return json as Pokemon;
        } catch {
            throw new Error("unexpected error fetching pokemon");
        }
    }
}
