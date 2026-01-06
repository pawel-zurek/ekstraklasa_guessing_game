const API_BASE = "http://localhost:8000";

export async function searchPlayers(query: string) {
  const res = await fetch(`${API_BASE}/players/search?q=${query}`);
  return res.json();
}

export async function getGameToday() {
  const res = await fetch(`${API_BASE}/game/today`);
  return res.json();
}

export async function submitGuess(playerId: number, guessNumber: number) {
  const res = await fetch(`${API_BASE}/game/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player_id: playerId,
      guess_number: guessNumber,
    }),
  });

  if (!res.ok) {
    throw new Error("Guess failed");
  }

  return res.json();
}
