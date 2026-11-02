import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingView } from './views/LandingView';
import { TopicPickerView } from './views/TopicPickerView';
import { TeachingRoomView } from './views/TeachingRoomView';
import { GapReportView } from './views/GapReportView';
import { ExplainSimplyView } from './views/ExplainSimplyView';
import { MasteryMapView } from './views/MasteryMapView';
import { TeacherDashboardView } from './views/TeacherDashboardView';
import { AchievementsView } from './views/AchievementsView';
import { LoginModal } from './components/LoginModal';
import { INITIAL_TOPICS, INITIAL_BADGES } from './data/topics';
import { Topic, SessionResult, StudentProfile, Badge } from './types';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(INITIAL_TOPICS[0]);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Alex Rivera',
    role: 'student',
    grade: 'High School (Grade 10)',
    streakDays: 5,
    streakActive: true,
    totalSessionsCompleted: 8,
    unlockedBadges: ['first-lesson', 'jargon-slayer', 'gap-hunter', 'streak-master']
  });

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topic: Topic, mode: 'standard' | 'age5' = 'standard') => {
    setSelectedTopic(topic);
    if (mode === 'age5') {
      setCurrentTab('age5');
    } else {
      setCurrentTab('teaching');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishSession = (result: SessionResult) => {
    setSessionResult(result);

    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === result.topicId) {
          return {
            ...t,
            mastery: Math.max(t.mastery, result.score)
          };
        }
        return t;
      })
    );

    if (result.score >= 90) {
      setBadges((prev) =>
        prev.map((b) => (b.id === 'bolt-favorite' ? { ...b, unlocked: true, unlockedAt: 'Just now' } : b))
      );
    }

    setCurrentTab('gap-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId) {
          const nextState = !b.unlocked;
          return {
            ...b,
            unlocked: nextState,
            unlockedAt: nextState ? 'Just unlocked' : undefined
          };
        }
        return b;
      })
    );
  };

  const handleAwardBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true, unlockedAt: 'Earned today' } : b))
    );
  };

  const handleIncrementStreak = () => {
    setProfile((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-body selection:bg-teal-500/20 selection:text-teal-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        profile={profile}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentTab === 'landing' && (
          <LandingView
            onStartTeaching={() => setIsLoginModalOpen(true)}
            onExploreTopics={() => handleNavigate('topics')}
            onOpenAge5Challenge={() => handleNavigate('age5')}
            onViewTeacherMode={() => handleNavigate('teacher')}
          />
        )}

        {currentTab === 'topics' && (
          <TopicPickerView
            topics={topics}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {currentTab === 'teaching' && (
          <TeachingRoomView
            topic={selectedTopic}
            onFinishSession={handleFinishSession}
            onBackToTopics={() => handleNavigate('topics')}
          />
        )}

        {currentTab === 'gap-report' && sessionResult && (
          <GapReportView
            result={sessionResult}
            onRetrySession={() => handleSelectTopic(selectedTopic, 'standard')}
            onBackToTopics={() => handleNavigate('topics')}
          />
        )}

        {currentTab === 'gap-report' && !sessionResult && (
          <div className="max-w-md mx-auto my-20 p-8 rounded-2xl glass-panel text-center space-y-4 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">No Teaching Session Completed Yet</h2>
            <p className="text-xs text-slate-600">
              Teach Bolt any topic to generate your first personalized Knowledge Gap Report!
            </p>
            <button
              onClick={() => handleNavigate('topics')}
              className="py-2.5 px-4 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 cursor-pointer shadow-xs"
            >
              Choose a Topic to Teach
            </button>
          </div>
        )}

        {currentTab === 'age5' && (
          <ExplainSimplyView
            topics={topics}
            selectedTopicId={selectedTopic?.id}
            onAwardBadge={handleAwardBadge}
            onBackToTopics={() => handleNavigate('topics')}
          />
        )}

        {currentTab === 'mastery' && (
          <MasteryMapView
            topics={topics}
            onSelectTopic={(t) => handleSelectTopic(t, 'standard')}
          />
        )}

        {currentTab === 'teacher' && (
          <TeacherDashboardView />
        )}

        {currentTab === 'achievements' && (
          <AchievementsView
            badges={badges}
            profile={profile}
            onToggleBadge={handleToggleBadge}
            onIncrementStreak={handleIncrementStreak}
          />
        )}
      </main>

      {/* Login & Profile Selector Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          if (profile.role === 'teacher') {
            handleNavigate('teacher');
          } else {
            handleNavigate('topics');
          }
        }}
        currentProfile={profile}
        onSaveProfile={(updated) => {
          setProfile(updated);
          if (updated.role === 'teacher') {
            handleNavigate('teacher');
          } else {
            handleNavigate('topics');
          }
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/90 py-6 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">TeachBack</span>
            <span aria-hidden="true">·</span>
            <span>Learn by Teaching</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-700 font-semibold">Smart Education</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <button
              onClick={() => handleNavigate('topics')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Curriculum
            </button>
            <button
              onClick={() => handleNavigate('age5')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Feynman Mode
            </button>
            <button
              onClick={() => handleNavigate('mastery')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Galaxy Map
            </button>
            <button
              onClick={() => handleNavigate('teacher')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Teacher View
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
