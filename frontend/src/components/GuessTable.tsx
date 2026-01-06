import type { GuessResult } from "../types/Game";

function emojiBool(value: boolean) {
  return value ? "✅" : "❌";
}

function emojiCompare(value: "higher" | "lower" | "equal") {
  if (value === "equal") return "🟰";
  if (value === "higher") return "⬆️";
  return "⬇️";
}

export default function GuessTable({ guesses }: { guesses: GuessResult[] }) {
  if (guesses.length === 0) return null;

  return (
    <table width="100%" border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Position</th>
          <th>Country</th>
          <th>Number</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {guesses.map((g, i) => {
          const p = g.guessed_player;
          const c = g.comparison;
          const isWin = g.status === "won";

          const age = new Date().getFullYear() - p.birth_year;

          return (
            <tr key={i}>
              <td>
                {p.first_name} {p.last_name}
              </td>

              <td>
                {p.team} {isWin ? "✅" : emojiBool(c.team)}
              </td>

              <td>
                {p.position} {isWin ? "✅" : emojiBool(c.position)}
              </td>

              <td>
                {p.country} {isWin ? "✅" : emojiBool(c.country)}
              </td>

              <td>
                {p.number} {isWin ? "🟰" : emojiCompare(c.number)}
              </td>

              <td>
                {age} {isWin ? "🟰" : emojiCompare(c.birthYear)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
