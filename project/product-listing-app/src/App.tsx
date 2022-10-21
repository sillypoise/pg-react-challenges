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
        <article className="">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul role="list" className="auto-grid">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className={
                                `stack box p-xs` +
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
                            <span className="text-0">
                                {formatPrice(product.price)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

function App() {
    let [query, setQuery] = useState("");
    return (
        <main className="mlb-l">
            <article className="center [--center-width:theme(contentWidth.3)] stack">
                <h1 className="text-3">Product listing app</h1>
                <hr />
                <form action="" className="cluster gap-s ">
                    <label htmlFor="product:query">Search:</label>
                    <input
                        type="text"
                        name=""
                        id="product:query"
                        placeholder="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-3xs rounded-md bg-[color:var(--neutral-surface-3)]"
                    />
                </form>
                <ProductList />
            </article>
        </main>
    );
}

// UTILS
function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    }).format(price);
}

export default App;
