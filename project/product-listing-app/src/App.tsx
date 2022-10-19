import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product } from "./types";
import { z } from "zod";

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
    query,
    handleQuery,
}: {
    query: string;
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
                    value={query}
                />
            </form>
        </div>
    );
}

function ProductSelectSort({
    sortOption,
    handleSort,
}: {
    sortOption: SortOption;
    handleSort: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <form action="" className="cluster gap-xs">
            <label htmlFor="product:sort">Sort by:</label>
            <select
                name="sort"
                id="product:sort"
                onChange={handleSort}
                className="border-2 rounded-md p-3xs"
                value={sortOption}
            >
                <option value="">...</option>
                <option value="price">price</option>
                <option value="name">name</option>
            </select>
        </form>
    );
}

enum SortOption {
    PRICE = "price",
    NAME = "name",
    NONE = "",
}

function App() {
    let [products, setProducts] = useState<Array<Product>>([]);
    let [isLoading, setIsLoading] = useState(true);
    let [sortOption, setSortOption] = useState<SortOption>(() => {
        let lsVal = localStorage.getItem("sortOption");
        try {
            let parsedLsVal = z.nativeEnum(SortOption).parse(lsVal);
            return parsedLsVal;
        } catch (e) {
            return SortOption.NONE;
        }
    });
    let [query, setQuery] = useState(() => {
        let lsVal = localStorage.getItem("query");
        if (lsVal) return lsVal;
        return "";
    });

    useMemo(() => {
        let productsCopy = [...products];
        if (sortOption === SortOption.PRICE) {
            setSortOption(sortOption);
            console.log("sorting by price");
            let productsByPrice = productsCopy.sort((a, b) => {
                if (a.price < b.price) return -1;
                return 1;
            });
            setProducts(productsByPrice);
        } else if (sortOption === SortOption.NAME) {
            console.log("sorting by name");
            setSortOption(sortOption);
            let productsByName = productsCopy.sort((a, b) => {
                return new Intl.Collator("es").compare(a.title, b.title);
            });
            setProducts(productsByName);
        } else if (sortOption === SortOption.NONE) {
            console.log("no sorting");
            setSortOption(sortOption);
        }
    }, [sortOption]);

    useEffect(() => {
        localStorage.setItem("query", query);
    }, [query]);

    useEffect(() => {
        localStorage.setItem("sortOption", sortOption);
    }, [sortOption]);

    useEffect(() => {
        api.search(query).then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, [query]);

    function handleQuery(event: ChangeEvent<HTMLInputElement>) {
        let inputValue = event.target.value.toLowerCase();
        setQuery(inputValue);
    }

    function handleSort(event: ChangeEvent<HTMLSelectElement>) {
        let selectedOption = event.target.value;
        if (
            selectedOption === SortOption.PRICE ||
            selectedOption === SortOption.NAME ||
            selectedOption === SortOption.NONE
        ) {
            setSortOption(selectedOption);
        }
    }

    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Product listing app</h1>
                <hr />
                <ProductSelectSort
                    handleSort={handleSort}
                    sortOption={sortOption}
                />
                <ProductSearchInput handleQuery={handleQuery} query={query} />
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
