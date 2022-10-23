const WORDS = ["WRONG", "RIGHT", "WORLD", "WORMS", "GONCY", "BELEN"];

let api = {
    random: (): Promise<string> =>
        new Promise((resolve) => setTimeout(() => resolve("RIGHT"), 1000)),
};

export { api };
