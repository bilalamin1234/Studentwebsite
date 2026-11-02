import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Send,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  School,
  Calendar,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEACHER_STUDENTS, CLASS_CONFUSION_HEATMAP } from '../data/topics';
import { soundFx } from '../utils/audio';

export const TeacherDashboardView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Period 3 Biology');
  const [dispatchedAlert, setDispatchedAlert] = useState<string | null>(null);
  const [studentActionFeedback, setStudentActionFeedback] = useState<Record<string, string>>({});

  const handleDispatchMiniLesson = () => {
    soundFx.playEurekaChime();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}
    setDispatchedAlert('Micro-revision challenge on "Water Photolysis vs CO2" sent to all 28 students!');
    setTimeout(() => setDispatchedAlert(null), 3500);
  };

  const handleStudentAction = (studentId: string, actionName: string) => {
    soundFx.playClick();
    setStudentActionFeedback((prev) => ({
      ...prev,
      [studentId]: actionName
    }));
    setTimeout(() => {
      setStudentActionFeedback((prev) => {
        const next = { ...prev };
        delete next[studentId];
        return next;
      });
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-1">
            <School className="w-4 h-4" />
            <span>Teacher Intelligence Console</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Classroom Confusion Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time analytics aggregated from your students teaching robot student Bolt
          </p>
        </div>

        {/* Classroom selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Viewing:</span>
          <select
            value={selectedClass}
            onChange={(e) => {
              soundFx.playClick();
              setSelectedClass(e.target.value);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-cyan-600 shadow-xs"
          >
            <option value="Period 3 Biology">Period 3 Biology (28 Students)</option>
            <option value="Period 5 Physics">Period 5 Physics (24 Students)</option>
            <option value="Grade 8 Integrated Science">Grade 8 Integrated Science (30 Students)</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl glass-panel shadow-xs border border-slate-200">
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Average Mastery</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">71.8%</span>
            <span className="text-xs font-bold text-teal-700">+4.2% this wk</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 142 total teaching dialogues</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel shadow-xs border border-slate-200">
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Top Misconception</span>
          <div className="mt-2">
            <span className="text-lg font-bold text-rose-700 line-clamp-1">Oxygen Origin (H2O)</span>
            <span className="text-xs font-mono text-rose-600 font-bold">78% Class Confusion</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Stumbled when Bolt probed deeper</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel shadow-xs border border-slate-200">
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Gaps Repaired</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-cyan-700 tabular-nums">46</span>
            <span className="text-xs text-slate-500">self-corrected</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Via revision cards post-session</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel shadow-xs border border-slate-200">
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Students Needing Help</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-amber-700 tabular-nums">2</span>
            <span className="text-xs text-slate-500">flagged for check-in</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Mastery below 50% benchmark</p>
        </div>
      </div>

      {/* Actionable Banner: "Topic to Re-Teach Tomorrow" */}
      <div className="p-6 rounded-3xl glass-panel-elevated border border-amber-300 bg-amber-50/40 mb-8 relative overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200/70 text-amber-900 border border-amber-300 uppercase">
                Recommended Action for Tomorrow
              </span>
              <span className="text-xs text-slate-500 font-mono font-semibold">Period 3 Biology</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Re-Teach Focus: "Where does plant oxygen actually come from?"
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>The Problem:</strong> When Bolt asked <em className="text-amber-900 font-semibold">“Why do plants need water if they don’t sweat?”</em>, <strong>78% of your students</strong> incorrectly claimed that oxygen is released from carbon dioxide (CO2) instead of photolysis of water (H2O).
            </p>

            <p className="text-xs text-slate-600">
              💡 <strong>Suggested 3-Minute Classroom Opener:</strong> Draw a water molecule (H-O-H) on the board. Ask: “If you steal the two hydrogens to build sugar, what lone atom is left over?”
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={handleDispatchMiniLesson}
              className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              <span>Send Mini-Revision to Class</span>
            </button>
            {dispatchedAlert && (
              <span className="text-[11px] text-teal-800 text-center font-bold animate-pulse">
                {dispatchedAlert}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Confusion Heatmap & Students Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Class Confusion Heatmap */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-6 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Class Confusion Heatmap
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Concepts ranked by the percentage of students who failed Bolt's follow-up questions
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">5 Monitored Concepts</span>
          </div>

          <div className="space-y-5">
            {CLASS_CONFUSION_HEATMAP.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 font-semibold">{item.topic}:</span>
                    <span className="text-xs font-bold text-slate-800">{item.concept}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-700 tabular-nums">
                      {item.confusionRate}% Confused
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.severity === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : item.severity === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.confusionRate >= 65
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500'
                        : item.confusionRate >= 45
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                        : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                    }`}
                    style={{ width: `${item.confusionRate}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 italic">
                  {item.keyMisconception}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Students Needing Support */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-6 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Student Live Roster
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Individual diagnostic status</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-700">{TEACHER_STUDENTS.length} Tracked</span>
          </div>

          <div className="space-y-3">
            {TEACHER_STUDENTS.map((student) => {
              const isStruggling = student.status === 'Struggling';
              const feedback = studentActionFeedback[student.id];

              return (
                <div
                  key={student.id}
                  className={`p-3.5 rounded-xl border transition-colors shadow-xs ${
                    isStruggling
                      ? 'bg-amber-50/70 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-bold text-xs text-teal-800 font-mono shadow-xs">
                        {student.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{student.name}</h4>
                        <p className="text-[11px] text-slate-500">
                          {student.currentTopic} · {student.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-teal-800 tabular-nums">
                        {student.mastery}%
                      </span>
                      <span className={`block text-[10px] font-bold ${
                        isStruggling ? 'text-amber-800' : 'text-teal-800'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-700 mt-2 font-mono">
                    Stuck on: <span className="text-slate-500">{student.stuckConcept}</span>
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                    {feedback ? (
                      <span className="text-[11px] text-teal-800 font-bold animate-pulse">
                        ✓ {feedback}
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStudentAction(student.id, 'Mini-lesson Sent')}
                          className="text-[11px] text-cyan-700 hover:text-cyan-800 font-bold cursor-pointer"
                        >
                          Send Revision Card
                        </button>
                        <button
                          onClick={() => handleStudentAction(student.id, 'Check-in Scheduled')}
                          className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                        >
                          5-Min Check-in
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
