import type { Comparison } from "../types/Game";

function cell(value: any) {
  let style = {};

  if (value === true || value === "equal") style = { background: "#4caf50" };
  else if (value === false) style = { background: "#f44336" };
  else style = { background: "#ff9800" };

  return <td style={style}>{String(value)}</td>;
}

export default function GuessRow({ comparison }: { comparison: Comparison }) {
  return (
    <tr>
      {cell(comparison.team)}
      {cell(comparison.position)}
      {cell(comparison.country)}
      {cell(comparison.number)}
      {cell(comparison.age)}
    </tr>
  );
}
