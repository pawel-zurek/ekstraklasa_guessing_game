type Props = {
  label: string;
  value: string | number;
  result?: boolean | "higher" | "lower" | "equal";
  isWin: boolean;
  wide?: boolean;
  neutral?: boolean;
};

function emoji(
  result: Props["result"],
  isWin: boolean,
  neutral?: boolean
) {
  if (neutral) return null;
  if (isWin) return "✅";
  if (result === true) return "✅";
  if (result === false) return "❌";
  if (result === "equal") return "🟰";
  if (result === "higher") return "⬆️";
  return "⬇️";
}

function classFor(
  result: Props["result"],
  isWin: boolean,
  neutral?: boolean
) {
  if (neutral) return "box neutral";
  if (isWin || result === true || result === "equal") return "box correct";
  if (result === false) return "box wrong";
  return "box close";
}

export default function GuessRow({
  label,
  value,
  result,
  isWin,
  wide = false,
  neutral = false,
}: Props) {
  return (
    <div
      className={`${classFor(result, isWin, neutral)} ${
        wide ? "box-wide" : ""
      }`}
    >
      <div className="box-label">{label}</div>
      <div className="box-value">
        {value}
        {!neutral && <> {emoji(result, isWin, neutral)}</>}
      </div>
    </div>
  );
}
