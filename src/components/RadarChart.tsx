import React, { useState } from 'react';

interface RadarData {
  clarity: number; // 0-100
  mechanism: number;
  vocabulary: number;
  simplicity: number;
  examples: number;
}

interface RadarChartProps {
  data: RadarData;
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 320,
  className = ''
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  const axes = [
    { key: 'clarity' as const, label: 'Clarity', desc: 'How clearly structured and easy to follow your explanation was' },
    { key: 'mechanism' as const, label: 'Mechanism', desc: 'Explaining WHY things happen, not just memorized names' },
    { key: 'vocabulary' as const, label: 'Scientific Depth', desc: 'Accurate terminology used in proper context' },
    { key: 'simplicity' as const, label: 'Simplicity', desc: 'Avoiding confusing jargon and using clean ideas' },
    { key: 'examples' as const, label: 'Real-world Analogies', desc: 'Using vivid mental models Bolt can picture' }
  ];

  const center = size / 2;
  const radius = (size / 2) - 44;
  const totalAxes = axes.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value: number, index: number, maxRadius = radius) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  const points = axes.map((axis, i) => {
    const val = data[axis.key] || 0;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          <defs>
            <linearGradient id="radarFillGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
            </linearGradient>
            <filter id="radarGlowLight" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid concentric rings */}
          {levels.map((level, lvlIdx) => {
            const levelPoints = axes.map((_, i) => {
              const { x, y } = getCoordinates(100 * level, i);
              return `${x},${y}`;
            }).join(' ');

            return (
              <g key={`level-${lvlIdx}`}>
                <polygon
                  points={levelPoints}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                  strokeDasharray={lvlIdx < 3 ? '3 3' : 'none'}
                />
                <text
                  x={center + 4}
                  y={center - radius * level - 2}
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {Math.round(level * 100)}%
                </text>
              </g>
            );
          })}

          {/* Axis lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(100, i);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Student Score Polygon */}
          <polygon
            points={points}
            fill="url(#radarFillGradLight)"
            stroke="#0D9488"
            strokeWidth="2.5"
            filter="url(#radarGlowLight)"
            className="transition-all duration-700 ease-out"
          />

          {/* Data Points on vertices */}
          {axes.map((axis, i) => {
            const val = data[axis.key];
            const { x, y } = getCoordinates(val, i);
            const isHovered = hoveredAxis === i;

            return (
              <g
                key={`pt-${i}`}
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => setHoveredAxis(i)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : 4.5}
                  fill={isHovered ? '#D97706' : '#0D9488'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Axis Labels outside */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(100, i, radius + 22);
            const isHovered = hoveredAxis === i;

            return (
              <text
                key={`lbl-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#0D9488' : '#475569'}
                fontSize="11"
                fontWeight={isHovered ? '700' : '600'}
                className="transition-colors duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredAxis(i)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                {axis.label}
              </text>
            );
          })}
        </svg>

        {/* Hover detail tooltip */}
        {hoveredAxis !== null && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-xl text-center pointer-events-none z-20 whitespace-nowrap">
            <p className="text-xs font-bold text-teal-700">
              {axes[hoveredAxis].label}: <span className="font-mono text-slate-900">{data[axes[hoveredAxis].key]}%</span>
            </p>
            <p className="text-[10px] text-slate-500 max-w-xs">{axes[hoveredAxis].desc}</p>
          </div>
        )}
      </div>

      {/* Numerical score indicators strip */}
      <div className="grid grid-cols-5 gap-2 w-full mt-8 pt-3 border-t border-slate-200 text-center">
        {axes.map((axis) => (
          <div key={axis.key} className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-semibold truncate">{axis.label}</span>
            <span className="font-mono text-xs font-bold text-slate-800 tabular-nums">
              {data[axis.key]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
