import { useEffect, useState } from "react";
import { api } from "./api";
import { Item } from "./types";

function TaskList({
    items,
    handleDelete,
}: {
    items: Array<Item>;
    handleDelete: (id: Item["id"]) => void;
}) {
    if (!items.length) {
        return <p>Seems like you're done with your tasks! ✌️</p>;
    }
    return (
        <ul role="list" className="stack">
            {items.map((item) => (
                <li key={item.id} className="cluster gap-s">
                    <span>{item.text}</span>
                    <button onClick={() => handleDelete(item.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
}

function App() {
    let [items, setItems] = useState<Array<Item>>([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.list().then((data) => {
            setIsLoading(false);
            setItems(data);
        });
    }, []);

    function handleDelete(id: Item["id"]) {
        let filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
    }

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Generic Task App</h1>
                <hr />
                {isLoading ? (
                    <p>Loading your data...</p>
                ) : (
                    <TaskList items={items} handleDelete={handleDelete} />
                )}
            </article>
        </main>
    );
}

export default App;
