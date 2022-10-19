import { useEffect, useState } from "react";
import { api } from "./api";
import { Product } from "./types";

function ProductList({ products }: { products: Array<Product> }) {
    return (
        <ul
            role="list"
            className="center [--center-width:theme(contentWidth.3)] auto-grid"
        >
            {products.map((product) => (
                <li key={product.id} className="box">
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <span>${product.price}</span>
                </li>
            ))}
        </ul>
    );
}

function App() {
    let [products, setProducts] = useState<Array<Product>>([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.search().then((data) => {
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
                    <p>Loading your products...</p>
                ) : (
                    <ProductList products={products} />
                )}
            </article>
        </main>
    );
}

export default App;
