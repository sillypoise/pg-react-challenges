import React, { memo, useCallback, useState } from "react";
import "nes.css/css/nes.min.css";
import "../styles/tailwind.css";

import { POKEMONS } from "./constants";
import { Pokemon } from "./types";

let PokemonCard = memo(function PokemonCard({
    pokemon,
    onAdd,
    setCart,
}: {
    pokemon: Pokemon;
    onAdd: (pokmon: Pokemon) => void;
    setCart: React.Dispatch<React.SetStateAction<Array<Pokemon>>>;
}) {
    return (
        <article
            key={pokemon.id}
            className="box stack [--stack-gap:theme(spacing.3xs)]"
        >
            <img
                src={pokemon.image}
                alt={pokemon.description}
                className="nes-container"
            />
            <p className="text-1">{pokemon.name}</p>
            <p className="text-0">${pokemon.price}</p>
            <button
                onClick={() => onAdd(pokemon)}
                // onClick={() => setCart((cart) => cart.concat(pokemon))}
                className="nes-btn"
            >
                Add to cart
            </button>
        </article>
    );
});

function App() {
    let [cart, setCart] = useState<Map<Pokemon["id"], number>>(() => new Map());

    let onAdd = useCallback(function onAdd(pokemon: Pokemon) {
        let prevQty = cart.get(pokemon.id);
        setCart((cart) =>
        // TODO: Use Map instead of object. Make new copy of map each time with setCart
            // cart.set(pokemon.id, cart.set(pokemon.id, prevQty + 1))
        );
    }, []);

    console.dir(cart);

    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Pokemon Store</h1>
                <div>
                    <section className="auto-grid">
                        {POKEMONS.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                // onAdd={() =>
                                //     setCart((cart) => cart.concat(pokemon))
                                // }
                                onAdd={onAdd}
                                // setCart={setCart}
                            />
                        ))}
                    </section>
                </div>
                <pre>{JSON.stringify(Object.fromEntries(cart), null, 4)}</pre>
                <aside>
                    <button className="nes-btn is-primary">
                        0 items (total $0)
                    </button>
                </aside>
            </article>
        </main>
    );
}

export default App;
