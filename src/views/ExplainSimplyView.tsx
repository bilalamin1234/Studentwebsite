import React, { useState, useMemo } from 'react';
import {
  Baby,
  Sparkles,
  AlertOctagon,
  ArrowRight,
  CheckCircle2,
  Wand2,
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Topic } from '../types';
import { BoltRobot } from '../components/BoltRobot';
import { analyzeJargonAndSimplicity } from '../utils/jargonDetector';
import { soundFx } from '../utils/audio';

interface ExplainSimplyViewProps {
  topics: Topic[];
  selectedTopicId?: string;
  onAwardBadge?: (badgeId: string) => void;
  onBackToTopics: () => void;
}

export const ExplainSimplyView: React.FC<ExplainSimplyViewProps> = ({
  topics,
  selectedTopicId,
  onAwardBadge,
  onBackToTopics
}) => {
  const [currentTopicId, setCurrentTopicId] = useState<string>(
    selectedTopicId || topics[0]?.id || 'photosynthesis'
  );

  const activeTopic = topics.find((t) => t.id === currentTopicId) || topics[0];

  const [text, setText] = useState(
    "Photosynthesis is when plants use their green chlorophyll in chloroplasts to absorb sunlight energy and perform photolysis on water to synthesize glucose."
  );

  const [boltFeedback, setBoltFeedback] = useState<{
    text: string;
    expression: 'happy' | 'confused' | 'curious' | 'mind-blown';
  } | null>(null);

  const analysis = useMemo(() => {
    return analyzeJargonAndSimplicity(text);
  }, [text]);

  const handleTopicChange = (topicId: string) => {
    soundFx.playClick();
    setCurrentTopicId(topicId);
    const chosen = topics.find((t) => t.id === topicId);
    if (chosen) {
      if (chosen.id === 'photosynthesis') {
        setText("Photosynthesis is when plants use their green chlorophyll to perform photolysis and make glucose sugar.");
      } else if (chosen.id === 'newton-laws') {
        setText("Newton's first law explains that an object maintains inertia and constant velocity unless unbalanced friction exerts force.");
      } else if (chosen.id === 'how-the-internet-works') {
        setText("Routers direct packets across fiberoptic cables using IP addresses and DNS protocols.");
      } else {
        setText(chosen.starterPrompt);
      }
      setBoltFeedback(null);
    }
  };

  const replaceJargon = (word: string, replacement: string) => {
    soundFx.playClick();
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    setText((prev) => prev.replace(regex, replacement));
  };

  const handleAutoSimplify = () => {
    soundFx.playEurekaChime();
    let simplified = text;
    analysis.detectedJargon.forEach((j) => {
      const regex = new RegExp(`\\b${j.word}\\b`, 'gi');
      simplified = simplified.replace(regex, j.replacement);
    });
    setText(simplified);
  };

  const handleTestWithBolt = () => {
    if (analysis.simplicityScore >= 85) {
      soundFx.playEurekaChime();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setBoltFeedback({
        text: "YAAAAY! *happy hops* I totally get it now! You explained it like toys and candy! I can explain this to my robot puppy now!",
        expression: 'mind-blown'
      });

      if (onAwardBadge) {
        onAwardBadge('jargon-slayer');
      }
    } else if (analysis.simplicityScore >= 60) {
      soundFx.playRobotChirp();
      setBoltFeedback({
        text: "Almost there teacher! I picture most of it, but a couple of words still sound like a doctor talking.",
        expression: 'curious'
      });
    } else {
      soundFx.playConfusedBoop();
      setBoltFeedback({
        text: "Eeeek! *head scratches with squeaky antenna* Too many gigantic adult words! My 5-year-old RAM chip is overheating!",
        expression: 'confused'
      });
    }
  };

  const loadPreset = (presetText: string) => {
    soundFx.playClick();
    setText(presetText);
    setBoltFeedback(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Baby className="w-4 h-4" />
            <span>Feynman Technique Mode</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explain-It-Simply (Age 5) Challenge
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            “If you can’t explain it to a six-year-old, you don’t understand it yourself.” — Richard Feynman.
            Strip away academic jargon and explain the concept using everyday analogies.
          </p>
        </div>

        {/* Topic selector tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTopicChange(t.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                t.id === currentTopicId
                  ? 'bg-white text-amber-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left editor & Jargon detector, Right Bolt feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Input & Jargon Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl glass-panel-elevated p-6 border border-amber-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">
                Your Age 5 Explanation
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {analysis.wordCount} Words · {analysis.syllableCount} Syllables
              </span>
            </div>

            {/* Prompt mission callout */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-4 font-medium">
              <strong>Mission:</strong> {activeTopic.age5Prompt}
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Type your explanation as if speaking to a 5-year-old with toy blocks..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-slate-400 leading-relaxed transition-colors"
            />

            {/* Quick Presets */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Try a preset:</span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    loadPreset(
                      "Plants don't eat dirt! Their green leaves catch sunshine like solar panels, mix in water from the ground, and bake sweet sugar candy for themselves while puffing out clean air for us to breathe."
                    )
                  }
                  className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
                >
                  Super Simple (100% Kid)
                </button>
                <span>·</span>
                <button
                  onClick={() =>
                    loadPreset(
                      "Photosynthesis is an endothermic chemical reaction inside chloroplast organelles involving photolysis of water molecules."
                    )
                  }
                  className="text-rose-700 hover:text-rose-800 font-semibold underline cursor-pointer"
                >
                  Heavy Jargon (Textbook)
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleTestWithBolt}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs sm:text-sm hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Baby className="w-4 h-4" />
                <span>Test with 5-Year-Old Bolt</span>
              </button>

              {analysis.detectedJargon.length > 0 && (
                <button
                  onClick={handleAutoSimplify}
                  className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Auto-Simplify All Jargon ({analysis.detectedJargon.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Jargon Detector Analysis Panel */}
          <div className="rounded-2xl glass-panel p-6 shadow-xs border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Jargon Detector
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {analysis.detectedJargon.length} Complex Terms Flagged
              </span>
            </div>

            {analysis.detectedJargon.length === 0 ? (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-xs text-teal-900 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <p className="font-bold">Zero academic jargon detected!</p>
                  <p className="text-slate-700 mt-0.5">Your explanation is clear, grounded, and intuitive.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Click any suggested replacement below to instantly swap it into your explanation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {analysis.detectedJargon.map((jargon, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="line-through text-rose-600 font-mono text-xs font-bold">
                            {jargon.word}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Jargon</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mb-2 leading-tight">
                          {jargon.explanation}
                        </p>
                      </div>

                      <button
                        onClick={() => replaceJargon(jargon.word, jargon.replacement)}
                        className="py-1.5 px-2.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold text-left flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="truncate">Use: “{jargon.replacement}”</span>
                        <ArrowRight className="w-3 h-3 shrink-0 ml-1 text-teal-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Simplicity Meter & Bolt Reaction */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Simplicity Score Card */}
          <div className="rounded-2xl glass-panel-elevated p-6 border border-slate-200 shadow-md">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              ELI5 Simplicity Score
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="font-display text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
                {analysis.simplicityScore}
              </span>
              <span className="text-lg text-slate-500 font-mono">/ 100</span>
            </div>

            {/* Gauge */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300 p-0.5 my-3">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${analysis.simplicityScore}%`,
                  background:
                    analysis.simplicityScore >= 80
                      ? 'linear-gradient(90deg, #059669, #0d9488)'
                      : analysis.simplicityScore >= 55
                      ? 'linear-gradient(90deg, #d97706, #059669)'
                      : 'linear-gradient(90deg, #dc2626, #d97706)'
                }}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mt-4 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Reading Level:</span>
                <span className="font-mono font-bold text-amber-800">
                  {analysis.gradeLevelEstimate}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Verdict:</span>
                <span className="font-bold text-teal-800">{analysis.verdict}</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {analysis.feedback}
            </p>
          </div>

          {/* 5-Year-Old Bolt Robot Persona Station */}
          <div className="rounded-2xl glass-panel p-6 text-center border border-slate-200 shadow-xs">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              5-Year-Old Student Bolt
            </span>

            <div className="flex justify-center py-2">
              <BoltRobot
                expression={
                  boltFeedback
                    ? boltFeedback.expression
                    : analysis.simplicityScore >= 75
                    ? 'happy'
                    : 'confused'
                }
                size="lg"
                interactive={true}
              />
            </div>

            {/* Speech bubble */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left mt-3 shadow-xs">
              <p className="text-xs text-amber-800 font-mono font-bold mb-1">Little Bolt says:</p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {boltFeedback?.text ||
                  (analysis.simplicityScore >= 80
                    ? "“Whoa! That makes so much sense! Plants make their own candy from sunshine!”"
                    : "“Wait... what is an 'organelle' or 'photolysis'? Is that a flavor of ice cream?”")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
