import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Brain, Zap, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { BoltRobot } from '../components/BoltRobot';
import { soundFx } from '../utils/audio';
import { BoltExpression } from '../types';

interface LandingViewProps {
  onStartTeaching: () => void;
  onExploreTopics: () => void;
  onOpenAge5Challenge: () => void;
  onViewTeacherMode: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartTeaching,
  onExploreTopics,
  onOpenAge5Challenge,
  onViewTeacherMode
}) => {
  const [heroExpression, setHeroExpression] = useState<BoltExpression>('happy');
  const [interactiveTeaserInput, setInteractiveTeaserInput] = useState('');
  const [teaserResponse, setTeaserResponse] = useState<string | null>(null);

  const expressionsList: BoltExpression[] = ['happy', 'curious', 'confused', 'mind-blown'];

  const cycleExpression = () => {
    const currentIndex = expressionsList.indexOf(heroExpression);
    const next = expressionsList[(currentIndex + 1) % expressionsList.length];
    setHeroExpression(next);
  };

  const handleQuickTeaser = (text: string) => {
    soundFx.playClick();
    setInteractiveTeaserInput(text);
    if (text.toLowerCase().includes('sun') || text.toLowerCase().includes('light')) {
      setHeroExpression('curious');
      setTeaserResponse("Wait, so leaves are basically tiny solar-powered kitchens?! But why do they need water too?");
      soundFx.playRobotChirp();
    } else if (text.toLowerCase().includes('sugar') || text.toLowerCase().includes('glucose')) {
      setHeroExpression('mind-blown');
      setTeaserResponse("WHOA! They turn thin air and light into sweet candy?! My CPU just clicked!");
      soundFx.playEurekaChime();
    } else {
      setHeroExpression('confused');
      setTeaserResponse("Hmm... my antenna is scratching! Can you give an everyday analogy so my gears understand?");
      soundFx.playConfusedBoop();
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-18 md:pb-22">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Smart Education · The Protégé Effect</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-[1.12]">
              If you can teach it, <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-600 bg-clip-text text-transparent">
                you truly know it.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Most students memorize without deep understanding—and only discover gaps on exam day.
              Meet <strong className="text-teal-700">Bolt</strong>, your eager, slightly confused robot student.
              Teach him complex topics in your own words. His naive questions expose your blind spots,
              generating an instant <span className="text-amber-700 font-semibold">Knowledge Gap Report</span> so you master anything.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundFx.playEurekaChime();
                  onStartTeaching();
                }}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2.5 shadow-lg shadow-teal-600/25 cursor-pointer whitespace-nowrap"
              >
                <span>Start Teaching Bolt</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreTopics();
                }}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                Browse Sample Topics
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onViewTeacherMode();
                }}
                className="px-4 py-3.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                View Teacher Heatmap →
              </button>
            </div>

            {/* Micro proof / metadata row */}
            <div className="flex flex-wrap items-center gap-3 pt-4 text-xs text-slate-500 border-t border-slate-200">
              <span className="text-slate-700 font-semibold">Research-Backed</span>
              <span aria-hidden="true">·</span>
              <span>Based on the Feynman Technique</span>
              <span aria-hidden="true">·</span>
              <span>100% Free & Interactive</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-700 font-medium">Offline Ready</span>
            </div>
          </div>

          {/* Right Hero Stage: Interactive Bolt Station */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md p-6 rounded-3xl glass-panel-elevated relative overflow-hidden text-center border border-teal-200/80 shadow-xl">
              <div className="relative z-10 flex flex-col items-center">
                {/* Expression status pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 mb-4 font-mono">
                  <span>Current Emotion:</span>
                  <span className="text-teal-700 font-bold uppercase">{heroExpression}</span>
                  <span className="text-slate-300">·</span>
                  <button
                    onClick={cycleExpression}
                    className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold underline cursor-pointer"
                  >
                    Poke Bolt
                  </button>
                </div>

                {/* Animated Bolt Avatar */}
                <BoltRobot
                  expression={heroExpression}
                  size="xl"
                  onClick={cycleExpression}
                  className="my-2"
                />

                {/* Interactive Speech Teaser */}
                <div className="w-full mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left shadow-xs">
                  <p className="text-xs text-teal-700 font-mono font-semibold mb-1">Bolt says:</p>
                  <p className="text-sm text-slate-800 font-medium min-h-[40px] leading-relaxed">
                    {teaserResponse || "“Hi! I’m Bolt. I have 0 biology knowledge. Why do leaves have to be green? Why not purple? Teach me!”"}
                  </p>
                </div>

                {/* Quick test buttons */}
                <div className="w-full mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2">
                  <p className="text-[11px] text-slate-500 font-medium text-left">Tap a quick sample sentence to test him:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleQuickTeaser("Leaves use green chlorophyll to absorb red and blue sunlight.")}
                      className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    >
                      “Leaves use chlorophyll to trap sunlight...”
                    </button>
                    <button
                      onClick={() => handleQuickTeaser("Plants turn light into sweet glucose sugar.")}
                      className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    >
                      “Plants turn light into sweet glucose...”
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP "HOW IT WORKS" SECTION */}
      <section className="w-full border-y border-slate-200 bg-slate-100/70 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How TeachBack Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transform passive reading into active, impenetrable mastery in three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl glass-panel relative flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all group">
              <div>
                <span className="font-mono text-xs font-bold text-teal-700">01. THE LESSON</span>
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Teach In Your Own Words
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pick a topic like Photosynthesis or Newton’s Laws. Type your explanation directly to Bolt. No regurgitating definitions—explain the mechanism naturally.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Active synthesis phase
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl glass-panel relative flex flex-col justify-between hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div>
                <span className="font-mono text-xs font-bold text-amber-700">02. THE INTERROGATION</span>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Answer Bolt's Naive Doubts
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bolt acts like an inquisitive beginner. He catches your shortcuts: <em className="text-amber-800 font-medium">“Wait, so does the plant drink sun juice?”</em> Forcing you to clarify fundamental principles.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Socratic feedback loop
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl glass-panel relative flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-md transition-all group">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-700">03. THE DIAGNOSTIC</span>
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Knowledge Gap Report
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get a color-coded diagnostic: Mastered (green), Shaky (orange), and Missed (red), plus a visual radar chart and bite-sized revision cards to fix each weakness.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                Precision gap closure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL FEATURE HIGHLIGHT */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 text-left">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wide">
                Feynman Mode
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                The "Explain-It-Simply" Challenge
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Can you explain quantum computing or the internet to a 5-year-old? Our live <strong className="text-amber-800">Jargon Detector</strong> flags heavy textbook terminology like “photolysis” or “packet switching” and challenges you to substitute vivid kid-friendly analogies.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Jargon Word: <span className="line-through text-red-600 font-semibold">Photolysis</span></span>
                  <span className="text-teal-700 font-bold">→ Cracking water with light</span>
                </div>
              </div>
            </div>

            <div className="pt-6 text-left">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAge5Challenge();
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
              >
                <span>Launch Age 5 Challenge</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 text-left">
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wide">
                Instructor Intelligence
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Class-Wide Confusion Heatmap
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teachers see exactly where the class got stuck when teaching Bolt. Spot shared misconceptions across whole cohorts (e.g. 78% thinking oxygen comes from CO2 instead of water) and get recommended re-teaching strategies for tomorrow's lecture.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium">Oxygen Origin Misconception</span>
                  <span className="font-mono text-rose-600 font-bold">78% Class Confusion</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-6 text-left">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onViewTeacherMode();
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                <span>Inspect Teacher Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="w-full border-t border-slate-200 bg-slate-100/60 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Ready to test what you really know?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Bolt has powered up his processors and is ready with pen and paper. Pick a topic and start your first teaching session.
          </p>
          <div>
            <button
              onClick={() => {
                soundFx.playEurekaChime();
                onStartTeaching();
              }}
              className="px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-teal-600/25 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Teaching Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
