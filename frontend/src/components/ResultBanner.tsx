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

  if (!player) return null;

  return (
    <div className={`result-banner ${status} banner-enter`}>
      <h2>{status === "won" ? "🎉 You won!" : "❌ You lost!"}</h2>

      <p className="result-text">
        {status === "won"
          ? `You were right, the correct player is ${player.first_name} ${player.last_name}.`
          : `The correct player was ${player.first_name} ${player.last_name}.`}
      </p>

      <img
        src={`${API_BASE}/${player.photo}`}
        alt={`${player.first_name} ${player.last_name}`}
      />
    </div>
  );
}
