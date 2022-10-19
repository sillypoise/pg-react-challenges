import { Item } from "./types";

let api = {
    list: (): Promise<Array<Item>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        text: "Some thing to buy",
                        completed: false,
                    },
                    {
                        id: 2,
                        text: "Some other thing to buy",
                        completed: true,
                    },
                    {
                        id: 3,
                        text: "Some last to buy",
                        completed: false,
                    },
                ]);
            }, 1000);
        });
    },
};

export { api };
