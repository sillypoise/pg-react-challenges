import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product } from "./types";
import { z } from "zod";

function App() {
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
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Product listing app</h1>
                <hr />
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <pre>{JSON.stringify(products, null, 4)}</pre>
                )}
            </article>
        </main>
    );
}

// UTILS

export default App;
