import { ChangeEvent, useEffect, useState } from "react";
import { api } from "./api";
import { Product } from "./types";

function ProductList({ products }: { products: Array<Product> }) {
    function formatPrice(price: number) {
        // return price.toLocaleString("es-CO", {
        //     style: "currency",
        //     currency: "COP",
        //     currencyDisplay: "code",
        // });
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            currencyDisplay: "code",
        }).format(price);
    }
    return (
        <ul
            role="list"
            className="center [--center-width:theme(contentWidth.3)] auto-grid"
        >
            {products.map((product) => (
                <li
                    key={product.id}
                    className={
                        `box` +
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
                    <span className="text-0">{formatPrice(product.price)}</span>
                </li>
            ))}
        </ul>
    );
}

function ProductSearchInput({
    handleQuery,
}: {
    handleQuery: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="center">
            <form action="">
                <label htmlFor="product:search" />
                <input
                    type="text"
                    name="product:search"
                    id="product:search"
                    placeholder="search a product..."
                    className="border-2 rounded-md p-3xs"
                    onChange={handleQuery}
                />
            </form>
        </div>
    );
}

function App() {
    let [products, setProducts] = useState<Array<Product>>([]);
    let [isLoading, setIsLoading] = useState(true);
    let [query, setQuery] = useState("");

    useEffect(() => {
        api.search(query).then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, [query]);

    function handleQuery(event: ChangeEvent<HTMLInputElement>) {
        console.dir(event.target.value);
        let inputValue = event.target.value.toLowerCase();
        setQuery(inputValue);
    }

    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Product listing app</h1>
                <hr />
                <ProductSearchInput handleQuery={handleQuery} />
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
