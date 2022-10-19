import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
    useEffect(() => {
        api.search().then((data) => console.dir(data));
    }, []);

    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Product listing app</h1>
            </article>
        </main>
    );
}

export default App;
