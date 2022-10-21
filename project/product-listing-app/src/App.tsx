import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { Product } from "./types";
import { z } from "zod";

function App() {
    return (
        <main className="mlb-l">
            <article className="stack center">
                <h1 className="text-3">Product listing app</h1>
                <hr />
            </article>
        </main>
    );
}

// UTILS

export default App;
