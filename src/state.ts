import { createInterface, type Interface } from "node:readline";
import { commandCatch } from "./commandCatch";
import { commandExit } from "./commandExit";
import { commandExplore } from "./commandExplore";
import { commandHelp } from "./commandHelp";
import { commandMap, commandMapb } from "./commandMap";
import { PokeAPI } from "./pokeapi";
import type { Pokemon } from "./pokedex.types";
import { commandInspect } from "./commandInspect";
import { commandPokedex } from "./commandPokedex";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    face: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    pokedex: Record<string, Pokemon>;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export function initState(): State {
    const face = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });
    const pokeAPI = new PokeAPI();
    const pokedex = {};
    const nextLocationsURL = null;
    const prevLocationsURL = null;

    return {
        commands,
        face,
        pokeAPI,
        pokedex,
        nextLocationsURL,
        prevLocationsURL,
    };
}

const commands: Record<string, CLICommand> = {
    exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    map: {
        name: "map",
        description:
            "It displays the names of 20 location areas in the Pokemon world.",
        callback: commandMap,
    },
    mapb: {
        name: "mapb",
        description:
            "It displays the names of 20 previous location areas in the Pokemon world.",
        callback: commandMapb,
    },
    explore: {
        name: "explore",
        description: "explore certain area. Use case: explore <area_id>",
        callback: commandExplore,
    },
    catch: {
        name: "catch",
        description: "Catch a pokemon: `catch <pokemon_name>`.",
        callback: commandCatch,
    },

    inspect: {
        name: "inspect",
        description:
            "Get detailed description of caught pokemon: `inspect <pokemon_name>`",
        callback: commandInspect,
    },

    pokedex: {
        name: "pokedex",
        description: "Get information about caught pokemon",
        callback: commandPokedex,
    },
};
