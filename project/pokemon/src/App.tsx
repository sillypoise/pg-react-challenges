import { useState } from "react";
import "nes.css/css/nes.min.css";
import "../styles/tailwind.css";

import { POKEMONS } from "./constants";
import { Pokemon } from "./types";

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    return (
        <article key={pokemon.id}>
            <img
                src={pokemon.image}
                alt={pokemon.description}
                className="nes-container"
            />
            <div className="cluster">
                <p className="text-1">{pokemon.name}</p>
                <p className="text-0">${pokemon.price}</p>
            </div>
            <button className="nes-btn">Add to cart</button>
        </article>
    );
}

function App() {
    let [cart, setCart] = useState<Array<Pokemon>>([]);
    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Pokemon Store</h1>
                <div className="sidebar">
                    <section className="auto-grid">
                        {POKEMONS.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </section>
                    <pre>{JSON.stringify(cart, null, 4)}</pre>
                </div>
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
