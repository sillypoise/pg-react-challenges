import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product } from "./types";
import { z } from "zod";

enum SortOption {
    PRICE = "price",
    NAME = "name",
    NONE = "",
}

function useDebounce(value: string, delay: number = 1000) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        let handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function RecommendedProductList() {
    let [recommendedProducts, setRecommendedProducts] = useState<
        Array<Product>
    >([]);

    useEffect(() => {
        api.search().then((data) => setRecommendedProducts(data));
    }, []);
    return (
        <ul
            role="list"
            className="center [--center-width:theme(contentWidth.3)] auto-grid"
        >
            {[...recommendedProducts]
                .sort(() => (Math.random() > 0.5 ? 1 : -1))
                .slice(0, 2)
                .map((product) => (
                    <li
                        key={product.id}
                        className={
                            `box p-xs` +
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
    );
}

// Memoize component so that we don't unintentionally re-render this component
let MemoizedRecommenedProductList = memo(RecommendedProductList);

function ProductList({
    products,
    handleFavToggle,
}: {
    products: Array<Product>;
    handleFavToggle: (id: Product["id"]) => void;
}) {
    function formatPrice(price: number) {
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
                        `box p-xs` +
                        " " +
                        `${
                            product.price <= 100
                                ? "border-light-green-9 border-4"
                                : ""
                        }`
                    }
                    onClick={() => handleFavToggle(product.id)}
                >
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <span className="text-0">{formatPrice(product.price)}</span>
                    <p className="cursor-pointer text-0 select-none">
                        fav:{" "}
                        {product.favourite ? (
                            <span className="text-1">🌕</span>
                        ) : (
                            <span className="text-1">🌑</span>
                        )}
                    </p>
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

function App() {
    let [products, setProducts] = useState<Array<Product>>(() => {
        let lsVal = localStorage.getItem("products");
        try {
            if (lsVal) {
                console.dir(JSON.parse(lsVal));
                return JSON.parse(lsVal);
            } else {
                return [];
            }
        } catch (e) {
            return [];
        }
    });
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
    let debouncedQuery = useDebounce(query, 500);

    useMemo(() => {
        let productsCopy = [...products];
        if (sortOption === SortOption.PRICE) {
            setSortOption(sortOption);
            let productsByPrice = productsCopy.sort((a, b) => {
                if (a.price < b.price) return -1;
                return 1;
            });
            setProducts(productsByPrice);
        } else if (sortOption === SortOption.NAME) {
            setSortOption(sortOption);
            let productsByName = productsCopy.sort((a, b) => {
                return new Intl.Collator("es").compare(a.title, b.title);
            });
            setProducts(productsByName);
        } else if (sortOption === SortOption.NONE) {
            setSortOption(sortOption);
        }
    }, [sortOption]);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem("query", query);
    }, [query]);

    useEffect(() => {
        localStorage.setItem("sortOption", sortOption);
    }, [sortOption]);

    useEffect(() => {
        api.search(debouncedQuery).then((data) => {
            let productsWithFavourites = data.map((product) => ({
                ...product,
                favourite: false,
            }));
            setProducts(productsWithFavourites);
            setIsLoading(false);
        });
    }, [debouncedQuery]);

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

    function handleFavToggle(id: Product["id"]) {
        console.log();
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, favourite: !product.favourite }
                    : product
            )
        );
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
                    <ProductList
                        handleFavToggle={handleFavToggle}
                        products={products}
                    />
                )}
                <h3 className="text-2">Recommended products!</h3>
                <MemoizedRecommenedProductList
                // handleFavToggle={handleFavToggle}
                />
            </article>
        </main>
    );
}

// UTILS

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        currencyDisplay: "code",
    }).format(price);
}

export default App;
