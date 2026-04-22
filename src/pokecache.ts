type CacheEntry<Value> = {
    createdAt: number;
    value: Value;
};

export class Cache {
    #cache = new Map<string, CacheEntry<unknown>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap() {
        for (const [key, value] of this.#cache) {
            if (value.createdAt + this.#interval < Date.now()) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add<Value>(key: string, value: Value) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            value,
        });
    }

    get(key: string) {
        return this.#cache.get(key)?.value;
    }
}
