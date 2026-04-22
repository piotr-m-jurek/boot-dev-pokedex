export function cleanInput(input: string): string[] {
    return input
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((phrase) => phrase.trim().toLocaleLowerCase());
}
