import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Flame } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  profile: StudentProfile;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  profile,
  onOpenLogin
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    soundFx.setMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { id: 'topics', label: 'Topics' },
    { id: 'age5', label: 'Age 5 Challenge' },
    { id: 'mastery', label: 'Mastery Map' },
    { id: 'teacher', label: 'Teacher View' },
    { id: 'achievements', label: 'Achievements' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('landing')}
          className="text-left group flex items-center gap-2.5 focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <span className="font-display font-bold text-white text-sm">TB</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            TeachBack
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 text-sm cursor-pointer ${
                  isActive
                    ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action or profile lockup */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            title={isMuted ? 'Unmute Robot Voice & Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
          </button>

          {/* User profile / Role badge */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-teal-500/50 hover:bg-slate-200/60 transition-all text-xs text-slate-700 cursor-pointer"
            title="Click to switch student / teacher profile"
          >
            <div className="flex items-center gap-1 text-amber-600 font-mono font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{profile.streakDays}</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="font-semibold truncate max-w-[100px] text-slate-800">{profile.name}</span>
            <span className="text-[10px] text-teal-700 font-mono font-medium">
              {profile.role === 'teacher' ? 'Teacher' : 'Student'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
