import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Wordle Clone!</h1>
            </article>
        </main>
    );
}

export default App;
