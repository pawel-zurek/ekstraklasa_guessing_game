import { useEffect, useState } from "react";
import { submitGuess, getGameToday } from "../api/client";
import GuessInput from "../components/GuessInput";
import GuessTable from "../components/GuessTable";
import ResultBanner from "../components/ResultBanner";
import type { GuessResult, Player } from "../types/Game";

const MAX_GUESSES = 7;

export default function GamePage() {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [guessNumber, setGuessNumber] = useState(1);

  // ✅ ALWAYS starts with 7
  const [remainingGuesses, setRemainingGuesses] =
    useState<number>(MAX_GUESSES);

  const [status, setStatus] =
    useState<"playing" | "won" | "lost">("playing");

  useEffect(() => {
    async function loadGame() {
      const game = await getGameToday();

      // ✅ Only overwrite if backend sends a valid number
      if (typeof game.remaining_guesses === "number") {
        setRemainingGuesses(game.remaining_guesses);
      }
    }
    loadGame();
  }, []);

  async function handleGuess(player: Player) {
    if (status !== "playing") return;

    const result = await submitGuess(player.id, guessNumber);

    setGuesses(prev => [
      ...prev,
      { ...result, guessed_player: player },
    ]);

    setGuessNumber(n => n + 1);

    // ✅ submitGuess ALWAYS returns remaining_guesses
    setRemainingGuesses(result.remaining_guesses);
    setStatus(result.status);
  }

  return (
    <div className="game-page">
      <h1 className="title">Ekstraklasa Guessing Game</h1>

      <GuessInput
        onGuess={handleGuess}
        disabled={status !== "playing"}
        remainingGuesses={remainingGuesses}
        maxGuesses={MAX_GUESSES}
      />

      <GuessTable guesses={guesses} />

      <ResultBanner guesses={guesses} status={status} />
    </div>
  );
}
