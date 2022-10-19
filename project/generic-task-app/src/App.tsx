import { useEffect, useState } from "react";
import { api } from "./api";
import { Item } from "./types";

function TaskList({
    items,
    handleDelete,
    handleToggle,
}: {
    items: Array<Item>;
    handleDelete: (id: Item["id"]) => void;
    handleToggle: (id: Item["id"]) => void;
}) {
    let toggleStyles = "line-through";
    if (!items.length) {
        return <p>Seems like you're done with your tasks! ✌️</p>;
    }
    return (
        <ul role="list" className="stack">
            {items.map((item) => (
                <li key={item.id} className="cluster gap-s">
                    <span
                        onClick={() => handleToggle(item.id)}
                        className={
                            `cursor-pointer select-none` +
                            " " +
                            `${item.completed ? "line-through" : ""}`
                        }
                    >
                        {item.text}
                    </span>
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

    function handleToggle(id: Item["id"]) {
        let newItems = items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setItems(newItems);
    }

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Generic Task App</h1>
                <hr />
                {isLoading ? (
                    <p>Loading your data...</p>
                ) : (
                    <TaskList
                        items={items}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                )}
            </article>
        </main>
    );
}

export default App;
