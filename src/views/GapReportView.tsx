import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SessionResult, ConceptItem } from '../types';
import { RadarChart } from '../components/RadarChart';
import { BoltRobot } from '../components/BoltRobot';
import { soundFx } from '../utils/audio';

interface GapReportViewProps {
  result: SessionResult;
  onRetrySession: () => void;
  onBackToTopics: () => void;
  onConceptResolved?: (conceptId: string) => void;
}

export const GapReportView: React.FC<GapReportViewProps> = ({
  result,
  onRetrySession,
  onBackToTopics
}) => {
  const [activeRevisionConcept, setActiveRevisionConcept] = useState<ConceptItem | null>(null);
  const [revisionAnswer, setRevisionAnswer] = useState('');
  const [resolvedConcepts, setResolvedConcepts] = useState<Set<string>>(new Set());
  const [conceptFeedback, setConceptFeedback] = useState<string | null>(null);

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { label: 'Master Professor', badgeColor: 'text-teal-700', desc: 'Flawless intuition! Bolt has achieved complete clarity.' };
    if (score >= 75) return { label: 'Associate Instructor', badgeColor: 'text-cyan-700', desc: 'Great teaching! A few minor nuances were left unexplained.' };
    if (score >= 55) return { label: 'Apprentice Tutor', badgeColor: 'text-amber-700', desc: 'Good start. You understand the surface, but struggled to explain the deeper mechanism.' };
    return { label: 'Novice Guide', badgeColor: 'text-orange-700', desc: 'Significant knowledge gaps exposed. Review the revision cards below to solidify the foundation.' };
  };

  const grade = getScoreGrade(result.score);

  const handleOpenRevision = (concept: ConceptItem) => {
    soundFx.playClick();
    setActiveRevisionConcept(concept);
    setRevisionAnswer('');
    setConceptFeedback(null);
  };

  const handleResolveGap = () => {
    if (!activeRevisionConcept) return;

    soundFx.playEurekaChime();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    setResolvedConcepts((prev) => new Set(prev).add(activeRevisionConcept.id));
    setConceptFeedback("Knowledge Gap Repaired! Bolt's circuits have recorded this revised intuition.");

    setTimeout(() => {
      setActiveRevisionConcept(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Diagnostic Report</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Knowledge Gap Report: {result.topicTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Completed on {result.date} · Based on Bolt’s responses and keyword depth
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onRetrySession();
            }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Teach Topic Again</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onBackToTopics();
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-xs sm:text-sm font-bold text-white hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-teal-600/20"
          >
            <span>Explore More Topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Score Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Score & Tier Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl glass-panel-elevated p-6 flex flex-col justify-between border border-slate-200 shadow-md">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              Overall Teaching Score
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="font-display text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
                {result.score}
              </span>
              <span className="text-lg text-slate-500 font-mono">/ 100</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-bold ${grade.badgeColor}`}>
                  {grade.label}
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {result.totalTurns} Teaching Turns
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {grade.desc}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Understanding Gauge: <strong className="text-teal-700 font-bold">{result.meterValue}%</strong></span>
            <span>Gaps Repaired: <strong className="text-cyan-700 font-bold">{resolvedConcepts.size}</strong></span>
          </div>
        </div>

        {/* Radar Analysis Card (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-6 flex flex-col items-center justify-center border border-slate-200 shadow-xs">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cognitive Mastery Dimensions
            </h3>
            <span className="text-xs text-slate-500">Hover vertices for details</span>
          </div>

          <RadarChart data={result.radarScores} size={300} />
        </div>
      </div>

      {/* Concept Breakdown Section */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight">
            Detailed Concept Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Green concepts are solidly explained. Orange & red concepts contain knowledge gaps Bolt couldn't decipher.
          </p>
        </div>

        {/* 3 Categories: Explained Well, Shaky, Missed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* 1. Explained Well (Green) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Explained Well ({result.explainedWell.length + resolvedConcepts.size})
              </h3>
            </div>

            {result.explainedWell.length === 0 && resolvedConcepts.size === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-100 rounded-xl">
                No concepts met the full mastery bar in this session. Review shaky items below!
              </p>
            ) : (
              result.explainedWell.map((concept) => (
                <div
                  key={concept.id}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs shadow-xs"
                >
                  <p className="font-bold text-emerald-900 text-sm">{concept.name}</p>
                  <p className="text-slate-700 mt-1 leading-relaxed">{concept.shortDesc}</p>
                  <div className="mt-2 text-[11px] text-emerald-700 font-mono font-medium">
                    ✓ Clear intuition demonstrated
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 2. Shaky Concepts (Orange) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Shaky Concepts ({result.shakyConcepts.filter(c => !resolvedConcepts.has(c.id)).length})
              </h3>
            </div>

            {result.shakyConcepts.filter(c => !resolvedConcepts.has(c.id)).length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-100 rounded-xl">
                No shaky concepts detected in this tier!
              </p>
            ) : (
              result.shakyConcepts
                .filter(c => !resolvedConcepts.has(c.id))
                .map((concept) => (
                  <div
                    key={concept.id}
                    className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <p className="font-bold text-amber-900 text-sm">{concept.name}</p>
                      <p className="text-slate-700 mt-1 leading-relaxed">{concept.shortDesc}</p>
                      <p className="text-[11px] text-amber-800 mt-2 italic">
                        <strong>Pitfall:</strong> {concept.misconception}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenRevision(concept)}
                      className="mt-3 py-2 px-3 rounded-lg bg-amber-100 hover:bg-amber-200/80 text-amber-900 font-bold text-xs border border-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-700" />
                      <span>Fix this gap</span>
                    </button>
                  </div>
                ))
            )}
          </div>

          {/* 3. Missed Concepts (Red) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <XCircle className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Missed Concepts ({result.missedConcepts.filter(c => !resolvedConcepts.has(c.id)).length})
              </h3>
            </div>

            {result.missedConcepts.filter(c => !resolvedConcepts.has(c.id)).length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-100 rounded-xl">
                Zero missed core concepts! Great coverage.
              </p>
            ) : (
              result.missedConcepts
                .filter(c => !resolvedConcepts.has(c.id))
                .map((concept) => (
                  <div
                    key={concept.id}
                    className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <p className="font-bold text-rose-900 text-sm">{concept.name}</p>
                      <p className="text-slate-700 mt-1 leading-relaxed">{concept.shortDesc}</p>
                      <p className="text-[11px] text-rose-800 mt-2 italic">
                        <strong>Blind spot:</strong> Never mentioned or explained during dialogue.
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenRevision(concept)}
                      className="mt-3 py-2 px-3 rounded-lg bg-rose-100 hover:bg-rose-200/80 text-rose-900 font-bold text-xs border border-rose-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-rose-700" />
                      <span>Fix this gap</span>
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* REVISION CARD MODAL */}
      {activeRevisionConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 border border-slate-200 shadow-2xl">
            <button
              onClick={() => setActiveRevisionConcept(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-700 uppercase tracking-wide mb-1">
              <Zap className="w-4 h-4 text-teal-600" />
              <span>Targeted Revision Card</span>
            </div>

            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
              {activeRevisionConcept.name}
            </h3>

            <div className="space-y-3.5 text-xs text-slate-700">
              {/* Intuition Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-teal-800 block mb-1">The Core Intuition</span>
                <p className="leading-relaxed text-slate-700">{activeRevisionConcept.revision.intuition}</p>
              </div>

              {/* Analogy Box */}
              <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950">
                <span className="font-bold text-cyan-800 block mb-1">Visual Analogy</span>
                <p className="leading-relaxed">{activeRevisionConcept.revision.analogy}</p>
              </div>

              {/* Misconception */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-bold text-amber-800 block mb-1">Common Misconception</span>
                <p className="leading-relaxed">{activeRevisionConcept.misconception}</p>
              </div>

              {/* Key Takeaway */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
                <span className="font-bold text-teal-800 block mb-0.5">Key Formula / Takeaway</span>
                <p className="font-mono font-semibold">{activeRevisionConcept.revision.keyTakeaway}</p>
              </div>

              {/* Quick Practice Prompt */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Test Question: {activeRevisionConcept.revision.quickTestQuestion}
                </label>
                <input
                  type="text"
                  value={revisionAnswer}
                  onChange={(e) => setRevisionAnswer(e.target.value)}
                  placeholder="Type your quick answer or test explanation..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            {conceptFeedback && (
              <div className="mt-3 p-2.5 rounded-xl bg-teal-100 border border-teal-300 text-teal-900 text-xs text-center font-bold animate-pulse">
                {conceptFeedback}
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleResolveGap}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Gap Repaired</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
