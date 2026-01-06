import GuessRow from "./GuessRow";
import type { GuessResult } from "../types/Game";

export default function GuessTable({ guesses }: { guesses: GuessResult[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Position</th>
          <th>Country</th>
          <th>Number</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {guesses.map((g, i) => (
          <GuessRow key={i} comparison={g.comparison} />
        ))}
      </tbody>
    </table>
  );
}
