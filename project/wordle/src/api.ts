const WORDS = ["WRONG", "RIGHT", "WORLD", "WORMS", "GONCY", "BELEN"];

let api = {
    random: (): Promise<string> => {
        let randomIndex = Math.floor(Math.random() * 10) % WORDS.length;
        return new Promise((resolve) =>
            setTimeout(() => resolve(WORDS[randomIndex]), 1000)
        );
    },
};

export { api };
