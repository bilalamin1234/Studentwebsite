import React from 'react';
import { BoltExpression } from '../types';
import { soundFx } from '../utils/audio';

interface BoltRobotProps {
  expression?: BoltExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BoltRobot: React.FC<BoltRobotProps> = ({
  expression = 'curious',
  size = 'md',
  interactive = true,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const handleClick = () => {
    if (expression === 'confused') {
      soundFx.playConfusedBoop();
    } else if (expression === 'mind-blown') {
      soundFx.playEurekaChime();
    } else {
      soundFx.playRobotChirp();
    }
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${sizeMap[size]} ${className}`}
      title={`Bolt is ${expression}! Click him to hear a robot chirp.`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(15,23,42,0.14)]"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bodyGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="visorGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="tealGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient floating aura */}
        <circle
          cx="100"
          cy="110"
          r="72"
          className={`transition-all duration-700 opacity-25 ${
            expression === 'mind-blown'
              ? 'fill-amber-400 animate-pulse'
              : expression === 'happy'
              ? 'fill-teal-300'
              : expression === 'confused'
              ? 'fill-orange-400'
              : 'fill-cyan-300'
          }`}
        />

        {/* --- ANTENNA --- */}
        <g
          className={`transition-transform duration-500 origin-[100px_48px] ${
            expression === 'confused'
              ? 'rotate-[-12deg]'
              : expression === 'curious'
              ? 'rotate-[8deg]'
              : expression === 'mind-blown'
              ? 'scale-110'
              : ''
          }`}
        >
          {/* Antenna stem */}
          <path
            d="M 100 48 L 100 24"
            stroke="#475569"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Antenna glowing orb */}
          <circle
            cx="100"
            cy="18"
            r="10"
            fill={
              expression === 'mind-blown'
                ? 'url(#orangeGlow)'
                : expression === 'confused'
                ? '#F59E0B'
                : 'url(#tealGlow)'
            }
            filter="url(#glowEffect)"
          />
          {/* Antenna spark / ring for mind-blown */}
          {expression === 'mind-blown' && (
            <>
              <circle
                cx="100"
                cy="18"
                r="16"
                stroke="#EA580C"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="animate-spin origin-[100px_18px]"
                opacity="0.8"
              />
              <path
                d="M 100 2 L 100 8 M 84 18 L 90 18 M 110 18 L 116 18 M 89 7 L 93 11 M 111 7 L 107 11"
                stroke="#FB923C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}
          {/* Confused question mark spark */}
          {expression === 'confused' && (
            <text
              x="116"
              y="18"
              fill="#D97706"
              fontSize="14"
              fontWeight="bold"
              fontFamily="sans-serif"
              className="animate-bounce"
            >
              ?
            </text>
          )}
        </g>

        {/* --- EARS / HEAD BOLTS --- */}
        <rect x="36" y="74" width="8" height="20" rx="3" fill="#475569" />
        <circle cx="40" cy="84" r="2" fill="#2DD4BF" />
        <rect x="156" y="74" width="8" height="20" rx="3" fill="#475569" />
        <circle cx="160" cy="84" r="2" fill="#2DD4BF" />

        {/* --- HEAD BASE --- */}
        <rect
          x="44"
          y="46"
          width="112"
          height="86"
          rx="24"
          fill="url(#bodyGradLight)"
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* Glass Face Screen (Visor) */}
        <rect
          x="54"
          y="56"
          width="92"
          height="66"
          rx="16"
          fill="url(#visorGradLight)"
          stroke="#0F172A"
          strokeWidth="2"
        />

        {/* Visor highlight gleam */}
        <path
          d="M 58 64 Q 100 58 142 64"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* --- ROBOT EYES & EXPRESSIONS --- */}
        {expression === 'curious' && (
          <g>
            <circle cx="80" cy="86" r="11" fill="url(#tealGlow)" filter="url(#glowEffect)" />
            <circle cx="82" cy="84" r="4" fill="#FFFFFF" />
            <path d="M 72 70 Q 80 66 88 71" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />

            <circle cx="120" cy="87" r="9" fill="url(#tealGlow)" filter="url(#glowEffect)" />
            <circle cx="122" cy="85" r="3" fill="#FFFFFF" />
            <path d="M 112 73 Q 120 72 128 74" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />

            <path d="M 94 104 Q 100 106 106 103" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {expression === 'confused' && (
          <g>
            <circle cx="78" cy="88" r="9" fill="#F59E0B" filter="url(#glowEffect)" />
            <path
              d="M 74 88 A 4 4 0 1 1 82 88 A 2 2 0 1 1 78 88"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M 70 74 L 86 71" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

            <circle cx="122" cy="88" r="6" fill="#F59E0B" filter="url(#glowEffect)" />
            <circle cx="123" cy="87" r="2" fill="#FFFFFF" />
            <path d="M 114 71 L 129 76" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

            <path
              d="M 90 105 Q 94 101 98 105 Q 102 109 106 105 Q 110 101 114 105"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {expression === 'happy' && (
          <g>
            <path
              d="M 68 88 Q 80 74 92 88"
              stroke="#2DD4BF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#glowEffect)"
            />
            <path
              d="M 108 88 Q 120 74 132 88"
              stroke="#2DD4BF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#glowEffect)"
            />

            <circle cx="66" cy="98" r="5" fill="#F43F5E" opacity="0.45" />
            <circle cx="134" cy="98" r="5" fill="#F43F5E" opacity="0.45" />

            <path
              d="M 88 100 Q 100 114 112 100"
              stroke="#2DD4BF"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {expression === 'mind-blown' && (
          <g>
            <g transform="translate(80, 84)">
              <circle cx="0" cy="0" r="13" fill="#F97316" filter="url(#glowEffect)" />
              <path
                d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7"
                stroke="#FEF08A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>

            <g transform="translate(120, 84)">
              <circle cx="0" cy="0" r="13" fill="#F97316" filter="url(#glowEffect)" />
              <path
                d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7"
                stroke="#FEF08A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>

            <path d="M 68 66 Q 80 60 92 66" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 108 66 Q 120 60 132 66" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />

            <ellipse
              cx="100"
              cy="104"
              rx="7"
              ry="9"
              fill="#F97316"
              stroke="#FEF08A"
              strokeWidth="2"
            />
          </g>
        )}

        {expression === 'thinking' && (
          <g>
            <ellipse cx="78" cy="84" rx="9" ry="8" fill="url(#tealGlow)" filter="url(#glowEffect)" />
            <circle cx="75" cy="81" r="3" fill="#FFFFFF" />
            <path d="M 68 72 Q 78 70 88 74" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />

            <ellipse cx="122" cy="84" rx="9" ry="8" fill="url(#tealGlow)" filter="url(#glowEffect)" />
            <circle cx="119" cy="81" r="3" fill="#FFFFFF" />
            <path d="M 112 72 Q 122 70 132 74" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />

            <line x1="95" y1="104" x2="105" y2="104" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" />

            <circle cx="140" cy="50" r="3" fill="#2DD4BF" opacity="0.6" />
            <circle cx="148" cy="40" r="5" fill="#2DD4BF" opacity="0.8" />
            <circle cx="158" cy="28" r="7" fill="#2DD4BF" />
          </g>
        )}

        {/* --- NECK & BODY CHASSIS --- */}
        <rect x="88" y="132" width="24" height="12" rx="4" fill="#475569" />

        {/* Main Torso */}
        <rect
          x="60"
          y="144"
          width="80"
          height="48"
          rx="18"
          fill="url(#bodyGradLight)"
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* Chest Heart/Processor Meter */}
        <rect
          x="80"
          y="154"
          width="40"
          height="18"
          rx="6"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* LED Bars inside chest */}
        <rect
          x="85"
          y="159"
          width="6"
          height="8"
          rx="2"
          fill={expression === 'confused' ? '#F59E0B' : '#2DD4BF'}
        />
        <rect
          x="94"
          y="159"
          width="6"
          height="8"
          rx="2"
          fill={expression === 'confused' ? '#F59E0B' : '#2DD4BF'}
        />
        <rect
          x="103"
          y="159"
          width="6"
          height="8"
          rx="2"
          fill={expression === 'mind-blown' ? '#F97316' : '#2DD4BF'}
        />

        {/* --- ROBOT ARMS --- */}
        <g
          className={`transition-transform duration-500 origin-[60px_150px] ${
            expression === 'mind-blown'
              ? 'rotate-[-35deg]'
              : expression === 'happy'
              ? 'rotate-[-20deg]'
              : ''
          }`}
        >
          <path
            d="M 60 152 Q 40 162 42 178"
            stroke="#475569"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="42" cy="180" r="6" fill="#334155" stroke="#2DD4BF" strokeWidth="2" />
        </g>

        <g
          className={`transition-transform duration-500 origin-[140px_150px] ${
            expression === 'mind-blown'
              ? 'rotate-[35deg]'
              : expression === 'happy'
              ? 'rotate-[25deg]'
              : expression === 'curious'
              ? 'rotate-[-10deg]'
              : ''
          }`}
        >
          <path
            d="M 140 152 Q 160 162 158 178"
            stroke="#475569"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="158" cy="180" r="6" fill="#334155" stroke="#2DD4BF" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
