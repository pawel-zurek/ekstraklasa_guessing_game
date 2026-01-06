import { useState } from "react";
import { searchPlayers } from "../api/client";

type Props = {
  onGuess: (playerId: number) => void;
  disabled: boolean;
};

export default function GuessInput({ onGuess, disabled }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const res = await searchPlayers(value);
    setResults(res);
  }

  return (
    <div>
      <input
        placeholder="Type a player name..."
        value={query}
        onChange={handleChange}
        disabled={disabled}
      />

      {results.length > 0 && (
        <ul>
          {results.map((p) => (
            <li key={p.id} onClick={() => {
              onGuess(p.id);
              setQuery("");
              setResults([]);
            }}>
              {p.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
