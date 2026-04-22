import { startREPL } from "./repl";

async function main() {
    try {
        await startREPL();
    } catch (e) {
        // catch errors
        console.error(e);
    }
}

main();
