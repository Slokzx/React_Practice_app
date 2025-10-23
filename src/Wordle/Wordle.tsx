/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./Wordle.css";

const word_api = "https://random-word-api.herokuapp.com/all";
const tries = 6;
const worldLength = 5;
const randomWord = (list: string[]) => {
  const random = list[Math.floor(Math.random() * list.length)];
  console.log(random);
  return random;
};
const Wordle = () => {
  const [solution, setSolution] = useState("");
  const [guess, setGuess] = useState(Array(tries).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const onReset = () => {
    setIsGameOver(false);
    setCurrentGuess("");
    setGuess(Array(tries).fill(null));
  };
  useEffect(() => {
    const keypress = (e: { key: string }) => {
      if (isGameOver) {
        return;
      }

      if (guess.every((g) => g !== null)) {
        setIsGameOver(true);
        return;
      }

      if (e.key === "Backspace") {
        setCurrentGuess((prev: any) => prev.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        if (currentGuess.length !== worldLength) return;
        const guesses = [...guess];
        guesses[guess.findIndex((guessWord) => guessWord === null)] =
          currentGuess;
        setGuess(guesses);
        setCurrentGuess("");
        if (currentGuess === solution) {
          setIsGameOver(true);
        }
      } else {
        if (!/^[a-zA-Z]$/.test(e.key)) return;
        if (currentGuess.length < 5) {
          setCurrentGuess((prev: any) => prev + e.key);
        } else {
          return;
        }
      }
    };

    window.addEventListener("keydown", keypress);
    return () => window.removeEventListener("keydown", keypress);
  }, [currentGuess, guess, isGameOver, solution]);

  useEffect(() => {
    fetch(word_api)
      .then((res) => res.json())
      .then((data) => {
        const fiveLetter = data.filter(
          (words: string) => words.length === worldLength
        );
        const solution = randomWord(fiveLetter);
        setSolution(solution);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);

  const Tiles = ({ guessWord, isFinal }: any) => {
    const tiles = [];
    for (let i = 0; i < worldLength; i++) {
      let className = "tiles";
      const char = guessWord[i] ?? "";
      if (isFinal) {
        if (char === solution[i]) {
          className += " green";
        } else if (solution.includes(char)) {
          className += " yellow";
        } else {
          className += " gray";
        }
      }
      tiles.push(
        <div key={i} className={className}>
          {char}
        </div>
      );
    }
    return <div className="line">{tiles}</div>;
  };
  return (
    <div className="App">
      <div className="wordle">
        {guess.map((guessWord: any, inx) => {
          const isCurrentGuess =
            inx === guess.findIndex((guessWord) => guessWord === null);
          const isFinal =
            guessWord !== null && inx < guess.findIndex((g) => g === null);
          return (
            <Tiles
              guessWord={isCurrentGuess ? currentGuess : guessWord ?? ""}
              isFinal={isFinal}
            />
          );
        })}
      </div>
      {isGameOver && (
        <span>
          {currentGuess.toLowerCase() === solution.toLowerCase()
            ? "🎉 You Won!"
            : `❌ Game Over! The word was "${solution.toUpperCase()}"`}
        </span>
      )}
      <div>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default Wordle;
