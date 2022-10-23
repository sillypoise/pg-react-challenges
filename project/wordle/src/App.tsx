import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

function App() {
    const answer = "RIGHT";
    let [words, setWords] = useState<Array<Array<string>>>(() =>
        Array.from({ length: 6 }, () => new Array(5).fill(""))
    );
    let [turn, setTurn] = useState(0);
    let [status, setStatus] = useState<"playing" | "finished">("playing");

    let handleKeyDown = useCallback(
        function handleKeyDown(e: KeyboardEvent) {
            switch (e.key) {
                case "Enter": {
                    if (words[turn].join("") === answer) {
                        setStatus("finished");
                    }

                    setTurn((turn) => turn + 1);

                    return;
                }
                case "Backspace": {
                    e.preventDefault();
                    let firstEmptyIndex = words[turn].findIndex(
                        (letter) => letter === ""
                    );

                    if (firstEmptyIndex === -1) {
                        firstEmptyIndex = words[turn].length;
                    }

                    words[turn][firstEmptyIndex - 1] = "";

                    setWords(words.slice());

                    return;
                }
                default: {
                    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                        const firstEmptyIndex = words[turn].findIndex(
                            (letter) => letter === ""
                        );

                        if (firstEmptyIndex === -1) return;

                        words[turn][firstEmptyIndex] = e.key.toUpperCase();

                        setWords(words.slice());

                        return;
                    }
                }
            }
        },
        [turn, words, answer]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <main className="mlb-l">
            <article className="board ">
                {words.map((word, wordIndex) => (
                    <section key={wordIndex} className="word">
                        {word.map((letter, letterIndex) => {
                            return (
                                <article
                                    key={letterIndex}
                                    className={`letter` + " " + ``}
                                >
                                    {letter}
                                </article>
                            );
                        })}
                    </section>
                ))}
                <div className="grid">
                    <span>turn: {turn}</span>
                    <span>status: {status}</span>
                </div>
            </article>
        </main>
    );
}

export default App;
