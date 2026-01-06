import type { GuessResult } from "../types/Game";

const API_BASE = "http://localhost:8000";

export default function ResultBanner({
  guesses,
  status,
}: {
  guesses: GuessResult[];
  status: string;
}) {
  if (status === "playing") return null;

  const last = guesses[guesses.length - 1];
  const player = last.player;

  return (
    <div className="result-banner">
      <h2>{status === "won" ? "🎉 You won!" : "❌ You lost!"}</h2>

      {player && (
        <div>
          <img
            src={`${API_BASE}/${player.photo}`}
            alt={`${player.first_name} ${player.last_name}`}
            width={150}
          />
          <p>
            {player.first_name} {player.last_name} – {player.team}
          </p>
        </div>
      )}
    </div>
  );
}
