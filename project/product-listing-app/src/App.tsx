import React, { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product, SortBy } from "./types";
import { z } from "zod";

function ProductList({ query, sortBy }: { query: string; sortBy: SortBy }) {
    let [products, setProducts] = useState<Array<Product>>([]);
    let [isLoading, setIsLoading] = useState(false);
    let [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        let debouncer = setTimeout(() => setDebouncedQuery(query), 600);
        return () => clearTimeout(debouncer);
    }, [query, debouncedQuery]);

    useEffect(() => {
        setIsLoading(true);
        api.list(debouncedQuery).then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, [debouncedQuery]);

    function sortProducts(sortBy: SortBy) {
        if (sortBy === "") return products;
        if (sortBy === "name") {
            return [...products].sort((a, b) =>
                new Intl.Collator("es").compare(a.title, b.title)
            );
        }
        if (sortBy === "price") {
            return [...products].sort((a, b) => (a.price < b.price ? -1 : 1));
        }
        return products;
    }

    let sortedProducts = sortProducts(sortBy);

    return (
        <article className="">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul role="list" className="auto-grid">
                    {sortedProducts.map((product) => (
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

function SearchProductInput({
    query,
    setQuery,
}: {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
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
    );
}

function SelectProductSort({
    sortBy,
    setSortSelect,
}: {
    sortBy: string;
    setSortSelect: React.Dispatch<React.SetStateAction<SortBy>>;
}) {
    return (
        <form action="" className="cluster gap-s">
            <label htmlFor="product:sort">Sort by:</label>
            <select
                name="product:sort"
                id="product:sort"
                value={sortBy}
                onChange={(e) => setSortSelect(e.target.value as SortBy)}
                className="p-3xs rounded-md bg-[color:var(--neutral-surface-3)]"
            >
                <option value="">choose...</option>
                <option value="name">name</option>
                <option value="price">price</option>
            </select>
            <p>Sorting by: {sortBy}</p>
        </form>
    );
}

function App() {
    let [query, setQuery] = useState(() => {
        let localStorageQuery = localStorage.getItem("query");
        if (localStorageQuery) {
            return JSON.parse(localStorageQuery);
        }
        return "";
    });
    let [sortBy, setSortSelect] = useState<SortBy>(() => {
        let localStorageSortBy = localStorage.getItem("sortBy");
        if (localStorageSortBy) {
            return JSON.parse(localStorageSortBy);
        }
        return "";
    });

    useEffect(() => {
        localStorage.setItem("query", JSON.stringify(query));
        localStorage.setItem("sortBy", JSON.stringify(sortBy));
    }, [query, sortBy]);

    return (
        <main className="mlb-l">
            <article className="center [--center-width:theme(contentWidth.3)] stack">
                <h1 className="text-3">Product listing app</h1>
                <hr />
                <div className="cluster">
                    <SearchProductInput query={query} setQuery={setQuery} />
                    <SelectProductSort
                        sortBy={sortBy}
                        setSortSelect={setSortSelect}
                    />
                </div>
                <ProductList query={query} sortBy={sortBy} />
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
