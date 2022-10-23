import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
    const answer = "RIGHT";
    let [words, setWords] = useState<Array<Array<string>>>(() =>
        Array.from({ length: 6 }, () => new Array(5).fill("hi"))
    );

    // useEffect(() => {
    //     api.random((data) => setWords(data))
    // }, [words])

    return (
        <main className="mlb-l">
            <article className="center stack board">
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
            </article>
        </main>
    );
}

export default App;
