import { cleanInput } from "./cleanInput";
import { initState } from "./state";

export async function startREPL() {
    const state = initState();

    state.face.prompt();
    state.face.on("line", async (rawInput) => {
        const input = cleanInput(rawInput);

        if (input.length === 0) {
            state.face.prompt();
            return;
        }

        const [command, ...rest] = input;

        const selectedCommand = state.commands[command];
        if (!selectedCommand) {
            state.face.write("Unknown command");
            return;
        }

        await selectedCommand.callback(state, ...rest);
        state.face.prompt();
    });
}
