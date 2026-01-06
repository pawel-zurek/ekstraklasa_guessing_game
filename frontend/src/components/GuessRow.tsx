type Props = {
  label: string;
  value: string | number;
  result: boolean | "higher" | "lower" | "equal";
  isWin: boolean;
};

function emoji(result: Props["result"], isWin: boolean) {
  if (isWin) return "✅";
  if (result === true) return "✅";
  if (result === false) return "❌";
  if (result === "equal") return "🟰";
  if (result === "higher") return "⬆️";
  return "⬇️";
}

function getClass(result: Props["result"], isWin: boolean) {
  if (isWin) return "box correct";
  if (result === true || result === "equal") return "box correct";
  if (result === false) return "box wrong";
  return "box close";
}

export default function GuessRow({
  label,
  value,
  result,
  isWin,
}: Props) {
  return (
    <div className={getClass(result, isWin)}>
      <div className="box-label">{label}</div>
      <div className="box-value">
        {value} {emoji(result, isWin)}
      </div>
    </div>
  );
}
