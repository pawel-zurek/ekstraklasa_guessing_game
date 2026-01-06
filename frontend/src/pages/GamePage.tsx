import { useEffect, useState } from "react";
import { submitGuess, getGameToday } from "../api/client";
import GuessInput from "../components/GuessInput";
import GuessTable from "../components/GuessTable";
import ResultBanner from "../components/ResultBanner";
import type { GuessResult } from "../types/Game";

export default function GamePage() {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [guessNumber, setGuessNumber] = useState(1);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  useEffect(() => {
    getGameToday();
  }, []);

  async function handleGuess(playerId: number) {
    if (status !== "playing") return;

    const result = await submitGuess(playerId, guessNumber);
    setGuesses([...guesses, result]);
    setGuessNumber(guessNumber + 1);
    setStatus(result.status);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>Ekstraklasa Guessing Game</h1>

      <GuessInput onGuess={handleGuess} disabled={status !== "playing"} />

      <GuessTable guesses={guesses} />

      <ResultBanner guesses={guesses} status={status} />
    </div>
  );
}
