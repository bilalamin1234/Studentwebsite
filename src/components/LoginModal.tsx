import React, { useState } from 'react';
import { X, Check, GraduationCap, School } from 'lucide-react';
import { StudentProfile } from '../types';
import { BoltRobot } from './BoltRobot';
import { soundFx } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [role, setRole] = useState<'student' | 'teacher'>(currentProfile.role);
  const [grade, setGrade] = useState(currentProfile.grade);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playEurekaChime();
    onSaveProfile({
      ...currentProfile,
      name: name.trim() || (role === 'teacher' ? 'Ms. Albright' : 'Alex Rivera'),
      role,
      grade
    });
    onClose();
  };

  const handleQuickPreset = (presetRole: 'student' | 'teacher') => {
    soundFx.playClick();
    if (presetRole === 'student') {
      setName('Alex Rivera');
      setRole('student');
      setGrade('High School (Grade 10)');
    } else {
      setName('Dr. Sarah Chen');
      setRole('teacher');
      setGrade('Class 10-B Science');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 border border-slate-200 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Bolt */}
        <div className="flex items-center gap-4 mb-5">
          <BoltRobot expression="happy" size="sm" interactive={false} />
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Welcome to TeachBack</h3>
            <p className="text-xs text-slate-500">Tell Bolt who will be teaching him today</p>
          </div>
        </div>

        {/* Role toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setRole('student');
              soundFx.playClick();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-white text-teal-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Student Mode</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('teacher');
              soundFx.playClick();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              role === 'teacher'
                ? 'bg-white text-cyan-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <School className="w-4 h-4 text-cyan-600" />
            <span>Teacher Mode</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {role === 'teacher' ? 'Teacher / Instructor Name' : 'Student Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'teacher' ? 'e.g. Dr. Sarah Chen' : 'e.g. Alex Rivera'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 placeholder-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {role === 'teacher' ? 'Classroom / Section' : 'Grade / Education Level'}
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              {role === 'student' ? (
                <>
                  <option value="Middle School (Grade 6-8)">Middle School (Grade 6-8)</option>
                  <option value="High School (Grade 9-10)">High School (Grade 9-10)</option>
                  <option value="High School (Grade 11-12)">High School (Grade 11-12)</option>
                  <option value="College / University">College / University</option>
                  <option value="Curious Lifelong Learner">Curious Lifelong Learner</option>
                </>
              ) : (
                <>
                  <option value="Period 3 Biology">Period 3 Biology</option>
                  <option value="Period 5 Physics">Period 5 Physics</option>
                  <option value="Grade 8 Integrated Science">Grade 8 Integrated Science</option>
                  <option value="STEM Explorers Cohort">STEM Explorers Cohort</option>
                </>
              )}
            </select>
          </div>

          {/* Quick presets */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Quick fill demo:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickPreset('student')}
                className="text-teal-700 hover:text-teal-800 underline font-medium cursor-pointer"
              >
                Sample Student
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleQuickPreset('teacher')}
                className="text-cyan-700 hover:text-cyan-800 underline font-medium cursor-pointer"
              >
                Sample Teacher
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{role === 'teacher' ? 'Enter Teacher Console' : 'Start Teaching Bolt!'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
