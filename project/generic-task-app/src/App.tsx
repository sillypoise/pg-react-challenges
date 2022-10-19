import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
    useEffect(() => {
        api.list().then((data) => console.dir(data));
    }, []);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Generic Task App</h1>
            </article>
        </main>
    );
}

export default App;
