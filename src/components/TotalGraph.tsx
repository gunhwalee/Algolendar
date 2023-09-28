import { Count } from "@/utils/transformProfile";
import PercentText from "./PercentText";

export default function TotalGraph({ data }: { data: Count }) {
  const { count, total } = data;
  const ratio = count / total!;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeLength = ratio * circumference;
  const spaceLength = circumference - strokeLength;
  const percent = (ratio * 100).toFixed(1);

  return (
    <div className="w-32">
      <svg viewBox="0 0 100 100">
        <circle
          r={radius}
          cx={50}
          cy={50}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          stroke="#4a4a4a"
        />
        <circle
          r={radius}
          cx={50}
          cy={50}
          fill="none"
          strokeWidth={7}
          strokeLinecap="round"
          stroke="#ffa015"
          strokeDasharray={`${strokeLength} ${spaceLength}`}
        />
        <PercentText count={count} percent={percent} />
      </svg>
    </div>
  );
}
