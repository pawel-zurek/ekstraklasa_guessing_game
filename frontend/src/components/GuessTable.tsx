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
        const birthDate = new Date(p.birth_date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return (
          <div
            key={i}
            className="guess-row guess-reveal"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <GuessRow
              label="Player"
              value={`${p.first_name} ${p.last_name}`}
              isWin={isWin}
              wide
              neutral
            />

            <GuessRow label="Team" value={p.team} result={c.team} isWin={isWin} />
            <GuessRow
              label="Position"
              value={p.position}
              result={c.position}
              isWin={isWin}
            />
            <GuessRow
              label="Country"
              value={p.country}
              result={c.country}
              isWin={isWin}
            />
            <GuessRow
              label="Number"
              value={p.number}
              result={c.number}
              isWin={isWin}
            />
            <GuessRow
              label="Age"
              value={age}
              result={c.age}
              isWin={isWin}
            />
          </div>
        );
      })}
    </div>
  );
}
