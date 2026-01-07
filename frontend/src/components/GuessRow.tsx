type Props = {
  label: string;
  value: string | number;
  result?: boolean | "higher" | "lower" | "equal" | "older" | "younger";
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

  // number logic
  if (result === "higher") return "⬆️";
  if (result === "lower") return "⬇️";

  // age logic
  if (result === "younger") return "⬆️"; // target is older
  if (result === "older") return "⬇️";   // target is younger

  return null;
}

function classFor(
  result: Props["result"],
  isWin: boolean,
  neutral?: boolean
) {
  if (neutral) return "box neutral";
  if (isWin || result === true || result === "equal") return "box correct";
  if (result === false) return "box wrong";

  // includes higher/lower/older/younger
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
