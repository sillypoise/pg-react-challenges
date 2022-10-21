import { Product } from "./types";

let api = {
    list: (query: string): Promise<Array<Product>> => {
        console.count("API 💸");

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            id: 1,
                            title: "TV 55 pulgadas",
                            description: "TV 55 pulgadas, curva, marca gonzung",
                            price: 1000,
                        },
                        {
                            id: 2,
                            title: "Webcam para streams",
                            description: "Webcam marca logitency",
                            price: 200,
                        },
                        {
                            id: 3,
                            title: "Celular gama alta",
                            description: "Celular gama alta, marca xiaoncy",
                            price: 300,
                        },
                        {
                            id: 4,
                            title: "Dron profesional",
                            description:
                                "Dron que soporta fuertes vientos, marca phantoncy",
                            price: 500,
                        },
                        {
                            id: 5,
                            title: "Ventilador de escritorio",
                            description:
                                "Ventilador portable de escritorio, marca liliancy",
                            price: 50,
                        },
                    ].filter((product) => {
                        return product.title
                            .toLowerCase()
                            .includes(query.toLowerCase());
                    })
                );
            }, 1000);
        });
    },
};
export { api };
