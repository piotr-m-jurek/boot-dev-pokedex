# boot-dev-pokedex

A CLI Pokedex application built as part of the [Boot.dev](https://www.boot.dev) guided project, reimplemented in **TypeScript** (the original course uses Go).

An interactive REPL that lets you explore the Pokemon world via the [PokeAPI](https://pokeapi.co/api/v2).

## Topics Covered

- Building a REPL with command dispatch (`node:readline`)
- HTTP client with pagination (cursor-based `next`/`previous` URLs)
- In-memory TTL cache with automatic expiration reaping
- TypeScript strict mode, ES2022 private fields, async/await
- Testing with Vitest (parameterized tests, async timer tests)
- Linting and formatting with Biome

## Commands

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `help`               | Lists available commands                         |
| `exit`               | Exits the REPL                                   |
| `map`                | Shows the next 20 location areas                 |
| `mapb`               | Shows the previous 20 location areas             |
| `explore <area>`     | Lists Pokemon found in a location area           |
| `catch <pokemon>`    | Attempts to catch a Pokemon (random chance)       |
| `inspect <pokemon>`  | Shows stats of a caught Pokemon                  |
| `pokedex`            | Lists all caught Pokemon                         |

## Usage

```sh
npm install
npm run dev
```

Requires Node.js 18+.
