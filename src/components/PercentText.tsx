"use client";

import { useState } from "react";

export default function PercentText({
  count,
  percent,
}: {
  count: number;
  percent: string;
}) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const detectHover = (event: React.MouseEvent<SVGElement>): void => {
    if (event.type === "mouseenter") setIsHover(true);
    else setIsHover(false);
  };

  return (
    <g onMouseEnter={detectHover} onMouseLeave={detectHover}>
      <text
        className="text-xl"
        x={50}
        y={42}
        alignmentBaseline="middle"
        fill="white"
        style={{ textAnchor: "middle" }}
      >
        {isHover ? `${percent}%` : count}
      </text>
      <text
        className="text-xs text-gray-600"
        x={50}
        y={59}
        alignmentBaseline="middle"
        fill="#4a4a4a"
        style={{ textAnchor: "middle" }}
      >
        Solved
      </text>
    </g>
  );
}
