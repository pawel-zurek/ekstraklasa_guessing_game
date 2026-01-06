import { useEffect, useState } from "react";
import { searchPlayers } from "../api/client";
import type { Player } from "../types/Game";

type Props = {
  onGuess: (player: Player) => void;
  disabled: boolean;
  remainingGuesses: number;
  maxGuesses: number;
};

export default function GuessInput({
  onGuess,
  disabled,
  remainingGuesses,
  maxGuesses,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Player[]>([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(t);
  }, [remainingGuesses]);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const res = await searchPlayers(value);
    setResults(res);
  }

  const danger = remainingGuesses <= 3;

  return (
    <div className="guess-input-wrapper">
      <div className="input-row">
        <input
          className="guess-input"
          value={query}
          onChange={handleChange}
          placeholder="Type a player name..."
          disabled={disabled}
        />

        <div
          className={`guess-counter ${
            danger ? "danger" : ""
          } ${animate ? "pulse" : ""}`}
        >
          <span className="guess-counter-number">
            {remainingGuesses ?? maxGuesses}
          </span>
          <span className="guess-counter-label">
            guesses left
          </span>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="autocomplete">
          {results.map((p) => (
            <li
              key={p.id}
              className="autocomplete-item"
              onMouseDown={() => {
                onGuess(p);
                setQuery("");
                setResults([]);
              }}
            >
              <strong>
                {p.first_name} {p.last_name}
              </strong>
              <span>{p.team}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
