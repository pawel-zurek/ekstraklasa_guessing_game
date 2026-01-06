import { useState } from "react";
import { searchPlayers } from "../api/client";
import type { Player } from "../types/Game";

type Props = {
  onGuess: (player: Player) => void;
  disabled: boolean;
};

export default function GuessInput({ onGuess, disabled }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Player[]>([]);

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
    <div style={{ position: "relative" }}>
      <input
        placeholder="Type a player name..."
        value={query}
        onChange={handleChange}
        disabled={disabled}
      />

      {results.length > 0 && (
  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      border: "1px solid #ccc",
      position: "absolute",
      background: "#fff",
      width: "100%",
      zIndex: 10,
      maxHeight: "200px",
      overflowY: "auto",
    }}
  >
    {results.map((p) => (
      <li
        key={p.id}
        style={{
          padding: "8px",
          cursor: "pointer",
          color: "#000",
          borderBottom: "1px solid #eee",
        }}
        onMouseDown={() => {
          // 👈 use onMouseDown to avoid input blur issues
          onGuess(p);
          setQuery("");
          setResults([]);
        }}
      >
        <strong>
          {p.first_name} {p.last_name}
        </strong>{" "}
        <span style={{ color: "#666" }}>({p.team})</span>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}
