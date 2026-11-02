import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface UnderstandingMeterProps {
  value: number; // 0 to 100
  delta?: number | null;
  compact?: boolean;
  className?: string;
}

export const UnderstandingMeter: React.FC<UnderstandingMeterProps> = ({
  value,
  delta = null,
  compact = false,
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const getStatus = (val: number) => {
    if (val >= 85) return { label: 'Deep Clarity & Eureka!', color: 'text-teal-700' };
    if (val >= 60) return { label: 'Connecting the Dots', color: 'text-cyan-700' };
    if (val >= 35) return { label: 'Grasping the Basics', color: 'text-amber-700' };
    return { label: 'Bolt is Puzzled...', color: 'text-orange-700' };
  };

  const status = getStatus(clampedValue);

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
          <div
            className={`h-full transition-all duration-700 ease-out rounded-full ${
              clampedValue >= 75 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        <span className="font-mono text-xs font-semibold tabular-nums text-slate-700 whitespace-nowrap">
          {clampedValue}%
        </span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl glass-panel relative overflow-hidden ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wide uppercase text-slate-500">Bolt's Understanding</h4>
            <p className={`text-xs font-semibold ${status.color} transition-colors duration-300`}>
              {status.label}
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 transition-all duration-500">
            {clampedValue}
          </span>
          <span className="text-xs text-slate-500 font-mono">%</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-300">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative"
          style={{
            width: `${clampedValue}%`,
            background: clampedValue >= 75
              ? 'linear-gradient(90deg, #0284c7 0%, #0d9488 100%)'
              : clampedValue >= 45
              ? 'linear-gradient(90deg, #d97706 0%, #0284c7 100%)'
              : 'linear-gradient(90deg, #dc2626 0%, #ea580c 100%)',
            boxShadow: clampedValue > 20 ? '0 0 10px rgba(13, 148, 136, 0.35)' : 'none'
          }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </div>
      </div>

      {/* Target markers */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
        <span>0% Naive</span>
        <span>50% Working Knowledge</span>
        <span>100% Mastery</span>
      </div>

      {/* Delta indicator if recent change */}
      {delta !== null && delta !== 0 && (
        <div
          className={`mt-2 flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${
            delta > 0 ? 'text-teal-700' : 'text-orange-700'
          }`}
        >
          {delta > 0 ? (
            <span className="inline-flex items-center gap-1 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px] font-mono text-teal-800">
              +{delta}% comprehension gained! Bolt's gears are turning.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded text-[11px] font-mono text-orange-800">
              <AlertCircle className="w-3 h-3 text-orange-600" /> Needs more detail or specific examples.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
