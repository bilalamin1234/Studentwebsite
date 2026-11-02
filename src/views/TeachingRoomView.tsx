import React, { useState, useEffect, useRef } from 'react';
import { Send, Lightbulb, CheckCircle2, Circle, AlertCircle, ArrowLeft, RefreshCw, BarChart2, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Topic, ChatMessage, BoltExpression, ConceptItem, SessionResult } from '../types';
import { BoltRobot } from '../components/BoltRobot';
import { UnderstandingMeter } from '../components/UnderstandingMeter';
import { soundFx } from '../utils/audio';

interface TeachingRoomViewProps {
  topic: Topic;
  onFinishSession: (result: SessionResult) => void;
  onBackToTopics: () => void;
}

export const TeachingRoomView: React.FC<TeachingRoomViewProps> = ({
  topic,
  onFinishSession,
  onBackToTopics
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [boltExpression, setBoltExpression] = useState<BoltExpression>('curious');
  const [understandingMeter, setUnderstandingMeter] = useState<number>(15);
  const [recentDelta, setRecentDelta] = useState<number | null>(null);
  const [isBoltTyping, setIsBoltTyping] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const [unlockedConceptIds, setUnlockedConceptIds] = useState<Set<string>>(new Set());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session with Bolt greeting
  useEffect(() => {
    const initialGreeting: ChatMessage = {
      id: 'msg-0',
      sender: 'bolt',
      text: topic.boltGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expression: 'curious'
    };
    setMessages([initialGreeting]);
    setBoltExpression('curious');
    setUnderstandingMeter(15);
    setUnlockedConceptIds(new Set());
    setHintIndex(0);
  }, [topic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBoltTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isBoltTyping) return;

    soundFx.playClick();
    const studentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newStudentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: studentTime
    };

    setMessages((prev) => [...prev, newStudentMsg]);
    setInputText('');
    setIsBoltTyping(true);
    setBoltExpression('thinking');

    const lower = text.toLowerCase();
    const wordCount = lower.split(/\s+/).filter(Boolean).length;

    const newlyIdentifiedConcepts: string[] = [];
    topic.concepts.forEach((concept) => {
      const matchesKeyword = concept.requiredKeywords.some((kw) => lower.includes(kw.toLowerCase()));
      if (matchesKeyword) {
        newlyIdentifiedConcepts.push(concept.id);
      }
    });

    setTimeout(() => {
      let matchedScript = topic.scriptedTurns.find((turn) => {
        return turn.triggerKeywords?.some((kw) => lower.includes(kw.toLowerCase()));
      });

      let nextExpression: BoltExpression = 'curious';
      let delta = 0;
      let replyText = '';

      if (wordCount < 4) {
        nextExpression = 'confused';
        delta = -8;
        replyText = "Beep? *scratches metal head* That was super quick! Can you explain HOW that actually works with more detail? My memory buffer is still empty!";
        soundFx.playConfusedBoop();
      } else if (matchedScript) {
        nextExpression = matchedScript.expression;
        delta = matchedScript.understandingDelta;
        replyText = matchedScript.boltResponse;

        if (nextExpression === 'mind-blown') {
          soundFx.playEurekaChime();
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch {}
        } else if (nextExpression === 'happy') {
          soundFx.playRobotChirp();
        } else {
          soundFx.playRobotChirp();
        }
      } else if (newlyIdentifiedConcepts.length > 0) {
        nextExpression = 'happy';
        delta = 18;
        replyText = "Aha! *eyes light up bright teal* That makes sense! You mentioned " +
          topic.concepts.find(c => c.id === newlyIdentifiedConcepts[0])?.name +
          ". But what happens right after that? Can you walk me through the next step?";
        soundFx.playRobotChirp();
      } else {
        nextExpression = 'curious';
        delta = 8;
        replyText = "Interesting! But why does that happen? If an alien asked you to prove it, what example would you show them?";
        soundFx.playConfusedBoop();
      }

      const nextUnlocked = new Set(unlockedConceptIds);
      newlyIdentifiedConcepts.forEach((id) => nextUnlocked.add(id));
      if (matchedScript?.unlockedConceptIds) {
        matchedScript.unlockedConceptIds.forEach((id) => nextUnlocked.add(id));
      }
      setUnlockedConceptIds(nextUnlocked);

      setRecentDelta(delta);
      setUnderstandingMeter((prev) => Math.min(100, Math.max(0, prev + delta)));
      setBoltExpression(nextExpression);
      setIsBoltTyping(false);

      const boltTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newBoltMsg: ChatMessage = {
        id: `bolt-${Date.now()}`,
        sender: 'bolt',
        text: replyText,
        timestamp: boltTime,
        expression: nextExpression,
        conceptsMentioned: newlyIdentifiedConcepts
      };

      setMessages((prev) => [...prev, newBoltMsg]);
    }, 900);
  };

  const handleGiveHint = () => {
    soundFx.playClick();
    if (topic.hints.length === 0) return;
    const current = topic.hints[hintIndex % topic.hints.length];
    setActiveHint(current);
    setHintIndex((prev) => prev + 1);
  };

  const handleFinish = () => {
    soundFx.playEurekaChime();

    const explainedWell: ConceptItem[] = [];
    const shakyConcepts: ConceptItem[] = [];
    const missedConcepts: ConceptItem[] = [];

    topic.concepts.forEach((concept) => {
      if (unlockedConceptIds.has(concept.id)) {
        explainedWell.push(concept);
      } else if (understandingMeter >= 50 && Math.random() > 0.5) {
        shakyConcepts.push(concept);
      } else {
        missedConcepts.push(concept);
      }
    });

    if (missedConcepts.length === 0 && shakyConcepts.length === 0 && understandingMeter < 95) {
      if (explainedWell.length > 1) {
        shakyConcepts.push(explainedWell.pop()!);
      }
    }

    const calculatedScore = Math.min(100, Math.max(35, Math.round((understandingMeter * 0.7) + (unlockedConceptIds.size / topic.concepts.length) * 30)));

    const result: SessionResult = {
      topicId: topic.id,
      topicTitle: topic.title,
      date: new Date().toLocaleDateString(),
      score: calculatedScore,
      meterValue: understandingMeter,
      explainedWell,
      shakyConcepts,
      missedConcepts,
      radarScores: {
        clarity: Math.min(95, Math.max(40, understandingMeter + 5)),
        mechanism: Math.min(95, Math.max(30, unlockedConceptIds.size * 25)),
        vocabulary: Math.min(95, Math.max(45, messages.length * 10)),
        simplicity: Math.min(95, Math.max(50, 85 - (messages.length > 6 ? 5 : 0))),
        examples: Math.min(95, Math.max(35, unlockedConceptIds.size * 22))
      },
      totalTurns: messages.filter((m) => m.sender === 'student').length,
      jargonCount: 2
    };

    onFinishSession(result);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onBackToTopics();
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            title="Return to topics"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-teal-700 font-bold">{topic.category}</span>
              <span aria-hidden="true">·</span>
              <span>Teaching Session in Progress</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {topic.title}
            </h1>
          </div>
        </div>

        {/* Action: Finish and View Gap Report */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleFinish}
            className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 shadow-md shadow-teal-600/20 cursor-pointer"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Finish & View Gap Report</span>
          </button>
        </div>
      </div>

      {/* Main Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Bolt & Understanding */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Bolt's Station Card */}
          <div className="rounded-2xl glass-panel-elevated p-6 text-center relative overflow-hidden border border-teal-200 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-mono font-semibold">Student Bolt</span>
              <span className="capitalize text-teal-700 font-bold font-mono">
                {boltExpression}
              </span>
            </div>

            <div className="py-2 flex justify-center">
              <BoltRobot
                expression={boltExpression}
                size="lg"
                interactive={true}
              />
            </div>

            <p className="text-xs text-slate-600 italic mt-2">
              {boltExpression === 'happy' && "“Bolt's circuits are tingling with understanding!”"}
              {boltExpression === 'curious' && "“Bolt is tilting his head, trying to visualize your words.”"}
              {boltExpression === 'confused' && "“Bolt’s antenna is twitching... something didn't quite add up.”"}
              {boltExpression === 'mind-blown' && "“EUREKA! Bolt's gears just locked into place!”"}
              {boltExpression === 'thinking' && "“Bolt is compiling your explanation into memory...”"}
            </p>

            <div className="mt-5 text-left">
              <UnderstandingMeter value={understandingMeter} delta={recentDelta} />
            </div>
          </div>

          {/* Key Concept Checklist Card */}
          <div className="rounded-2xl glass-panel p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Concepts to Teach Bolt
              </h3>
              <span className="text-xs font-mono font-bold text-teal-700">
                {unlockedConceptIds.size} / {topic.concepts.length} Unlocked
              </span>
            </div>

            <div className="space-y-2.5">
              {topic.concepts.map((concept) => {
                const isUnlocked = unlockedConceptIds.has(concept.id);
                return (
                  <div
                    key={concept.id}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isUnlocked
                        ? 'bg-teal-50 border-teal-200 text-teal-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isUnlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-bold ${isUnlocked ? 'text-teal-900' : 'text-slate-800'}`}>
                          {concept.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {concept.shortDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hint Card */}
          <div className="rounded-2xl glass-panel p-5 text-left border-amber-200 bg-amber-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Stuck? Need a Teaching Nudge?</span>
              </span>
              <button
                onClick={handleGiveHint}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
              >
                Reveal Hint
              </button>
            </div>
            {activeHint ? (
              <div className="p-3 bg-white border border-amber-200 rounded-xl text-xs text-amber-900 mt-2 font-medium shadow-xs">
                {activeHint}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Click “Reveal Hint” to see key concepts Bolt is eager to hear about next.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Chat */}
        <div className="lg:col-span-7 flex flex-col h-[750px] rounded-2xl glass-panel border border-slate-200 overflow-hidden shadow-sm">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Classroom Dialogue Feed</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {messages.filter(m => m.sender === 'student').length} Explanations Given
            </span>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isBolt = msg.sender === 'bolt';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 text-left ${isBolt ? '' : 'flex-row-reverse'}`}
                >
                  {isBolt ? (
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <BoltRobot expression={msg.expression || 'curious'} size="sm" interactive={false} />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-800 shrink-0">
                      You
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                    isBolt
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-teal-600 text-white font-medium'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-[10px] mt-1 text-right ${
                      isBolt ? 'text-slate-400' : 'text-teal-100'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bolt Typing Indicator */}
            {isBoltTyping && (
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  <BoltRobot expression="thinking" size="sm" interactive={false} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                  <span>Bolt is pondering your explanation</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-left">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5">
              <span>Quick Prompt Suggestions (Click to test):</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {topic.quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-xs font-medium"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box Footer */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-3"
            >
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  placeholder={`Explain ${topic.title} to Bolt in your own words... (Enter to send, Shift+Enter for new line)`}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 placeholder-slate-400 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim() || isBoltTyping}
                className="p-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-teal-600/20"
                aria-label="Send Explanation"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
