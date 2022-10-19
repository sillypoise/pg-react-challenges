import { useEffect, useState } from "react";
import { api } from "./api";
import { Item } from "./types";

function TaskList({ items }: { items: Array<Item> }) {
    return (
        <ul role="list" className="stack">
            {items.map((item) => (
                <li key={item.id} className="cluster gap-s">
                    <span>{item.text}</span>
                    <button>❌</button>
                </li>
            ))}
        </ul>
    );
}

function App() {
    let [items, setItems] = useState<Array<Item>>([]);

    useEffect(() => {
        api.list().then((data) => setItems(data));
    }, []);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Generic Task App</h1>
                <hr />
                {!items.length ? (
                    <p>Loading your data...</p>
                ) : (
                    <TaskList items={items} />
                )}
            </article>
        </main>
    );
}

export default App;
