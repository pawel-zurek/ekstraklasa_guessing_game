import GuessRow from "./GuessRow";
import type { GuessResult } from "../types/Game";

export default function GuessTable({ guesses }: { guesses: GuessResult[] }) {
  if (guesses.length === 0) return null;

  return (
    <div>
      {guesses.map((g, i) => {
        const p = g.guessed_player;
        const c = g.comparison;
        const isWin = g.status === "won";

        const age = new Date().getFullYear() - p.birth_year;

        return (
          <div key={i} className="guess-row">
            <GuessRow
              label="Team"
              value={p.team}
              result={isWin ? "equal" : c.team}
              isWin={isWin}
            />
            <GuessRow
              label="Position"
              value={p.position}
              result={isWin ? "equal" : c.position}
              isWin={isWin}
            />
            <GuessRow
              label="Country"
              value={p.country}
              result={isWin ? "equal" : c.country}
              isWin={isWin}
            />
            <GuessRow
              label="Number"
              value={p.number}
              result={isWin ? "equal" : c.number}
              isWin={isWin}
            />
            <GuessRow
              label="Age"
              value={age}
              result={isWin ? "equal" : c.birthYear}
              isWin={isWin}
            />
          </div>
        );
      })}
    </div>
  );
}
