import { useState } from "react";
import "../styles/tailwind.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Pokemon Store</h1>
            </article>
        </main>
    );
}

export default App;
