import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product } from "./types";
import { z } from "zod";

function ProductList() {
    let [products, setProducts] = useState<Array<Product>>([]);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api.list("").then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <article className="stack center">
            <h1 className="text-3">Product listing app</h1>
            <hr />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul role="list" className="auto-grid">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className={
                                `box p-s` +
                                " " +
                                `${
                                    product.price <= 100
                                        ? "border-light-green-9 border-4"
                                        : ""
                                }`
                            }
                        >
                            <h4>{product.title}</h4>
                            <p>{product.description}</p>
                            <span>$ {product.price}</span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

function App() {
    return (
        <main className="mlb-l">
            <ProductList />
        </main>
    );
}

// UTILS

export default App;
