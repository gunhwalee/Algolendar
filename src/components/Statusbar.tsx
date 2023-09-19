export default function Statusbar() {
  return (
    <>
      <div className="w-32">
        <svg viewBox="0 0 100 100">
          <circle
            r={46}
            cx={50}
            cy={50}
            fill="none"
            strokeWidth={4}
            strokeLinecap="round"
            stroke="gray"
          />
          <circle
            r={46}
            cx={50}
            cy={50}
            fill="none"
            strokeWidth={6}
            strokeLinecap="round"
            stroke="red"
            strokeDasharray={150}
          />
          <text
            className="per-label donut"
            x={50}
            y={50}
            alignmentBaseline="middle"
            style={{ textAnchor: "middle" }}
          >
            {23}%
          </text>
        </svg>
      </div>
      <div>
        <div>
          <div className="flex">
            <div>Easy</div>
            <div>33/714</div>
          </div>
          <div className="relative w-[200px] h-2">
            <div className="absolute w-full h-full bg-green-200 rounded"></div>
            <div className="absolute w-8 h-full bg-green-600 rounded"></div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div>Medium</div>
            <div>89/882</div>
          </div>
          <div className="relative w-[200px] h-2">
            <div className="absolute w-full h-full bg-yellow-200 rounded"></div>
            <div className="absolute w-20 h-full bg-yellow-600 rounded"></div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div>Hard</div>
            <div>22/637</div>
          </div>
          <div className="relative w-[200px] h-2">
            <div className="absolute w-full h-full bg-red-200 rounded"></div>
            <div className="absolute w-3 h-full bg-red-600 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
}
