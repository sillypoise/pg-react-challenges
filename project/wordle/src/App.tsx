import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

function App() {
    let [words, setWords] = useState<Array<Array<string>>>(() =>
        Array.from({ length: 6 }, () => new Array(5).fill(""))
    );
    let [turn, setTurn] = useState(0);
    let [status, setStatus] = useState<"playing" | "finished">("playing");
    let [answer, setAnswer] = useState("");

    useEffect(() => {
        api.random().then((data) => setAnswer(data));
    }, []);

    let handleKeyDown = useCallback(
        function handleKeyDown(e: KeyboardEvent) {
            if (status === "finished") {
                setWords(Array.from({ length: 6 }, () => Array(5).fill("")));
                setTurn(0);
                setStatus("playing");
                return;
            }
            switch (e.key) {
                case "Enter": {
                    if (words[turn].includes("")) return;
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
        if (answer) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown, answer]);

    return (
        <main className="mlb-l">
            <article className="board ">
                {words.map((word, wordIndex) => (
                    <section key={wordIndex} className="word">
                        {word.map((letter, letterIndex) => {
                            let isCorrect =
                                letter &&
                                wordIndex < turn &&
                                letter === answer[letterIndex];
                            let isPresent =
                                letter &&
                                wordIndex < turn &&
                                letter !== answer[letterIndex] &&
                                answer.includes(letter);
                            return (
                                <article
                                    key={letterIndex}
                                    className={`letter ${
                                        isCorrect && "correct"
                                    } ${isPresent && "present"}`}
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
                    <span>{status === "finished" && "You won! 🎊🎊🎊"}</span>
                    <span>answer: {answer}</span>
                </div>
            </article>
        </main>
    );
}

export default App;
