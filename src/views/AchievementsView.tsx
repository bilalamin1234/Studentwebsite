import React from 'react';
import {
  Flame,
  Award,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Target,
  Zap,
  Lock,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge, StudentProfile } from '../types';
import { soundFx } from '../utils/audio';

interface AchievementsViewProps {
  badges: Badge[];
  profile: StudentProfile;
  onToggleBadge: (badgeId: string) => void;
  onIncrementStreak: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  badges,
  profile,
  onToggleBadge,
  onIncrementStreak
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  const handleCelebrateStreak = () => {
    soundFx.playEurekaChime();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}
    onIncrementStreak();
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Honors & Streaks</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Teaching Achievements
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track your pedagogical milestones, active streaks, and mastery credentials
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-teal-700">
            {unlockedCount} of {badges.length} Badges Earned
          </span>
        </div>
      </div>

      {/* Streak Hero Card */}
      <div className="p-8 rounded-3xl glass-panel-elevated border border-amber-300 bg-amber-50/50 mb-8 relative overflow-hidden shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Flame graphic & count */}
          <div className="md:col-span-4 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0">
              <Flame className="w-10 h-10 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {profile.streakDays}
                </span>
                <span className="text-base text-amber-800 font-bold">Day Streak!</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Active teaching habit</p>
            </div>
          </div>

          {/* Daily streak days dots */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">This Week's Teaching Routine</span>
            <div className="flex items-center gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const isCompleted = idx < Math.min(7, profile.streakDays);
                const isToday = idx === Math.min(6, profile.streakDays - 1);

                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : day.charAt(0)}
                    </div>
                    <span className={`text-[10px] font-semibold ${isToday ? 'text-amber-800 font-bold' : 'text-slate-500'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center">
            <button
              onClick={handleCelebrateStreak}
              className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Extend Streak (+1 Day)</span>
            </button>
            <span className="text-[11px] text-slate-600 mt-1.5 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>1 Streak Freeze active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight">
            Teaching Badges
          </h2>
          <span className="text-xs text-slate-500">Click any badge to toggle unlocked state (Demo control)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => {
                  soundFx.playClick();
                  onToggleBadge(badge.id);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group shadow-xs ${
                  badge.unlocked
                    ? 'glass-panel-elevated border-teal-300 hover:border-teal-500 hover:shadow-md'
                    : 'glass-panel border-slate-200 opacity-65 hover:opacity-90'
                }`}
                title="Click to toggle status for testing"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        badge.unlocked
                          ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20'
                          : 'bg-slate-100 border border-slate-200 text-slate-400'
                      }`}
                    >
                      {getIcon(badge.icon)}
                    </div>

                    {badge.unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-teal-800 font-bold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="capitalize font-medium">{badge.category} Category</span>
                  {badge.unlocked && badge.unlockedAt && (
                    <span className="font-mono text-teal-700 font-bold">{badge.unlockedAt}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
