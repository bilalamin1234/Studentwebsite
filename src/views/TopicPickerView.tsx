import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Clock, ArrowRight, Baby, Filter } from 'lucide-react';
import { Topic } from '../types';
import { soundFx } from '../utils/audio';

interface TopicPickerViewProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic, mode: 'standard' | 'age5') => void;
}

export const TopicPickerView: React.FC<TopicPickerViewProps> = ({
  topics,
  onSelectTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Biology', 'Physics', 'Technology', 'Mathematics', 'Earth Science'];

  const filteredTopics = topics.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (diff: Topic['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'text-teal-700 font-semibold';
      case 'Intermediate':
        return 'text-cyan-700 font-semibold';
      case 'Advanced':
        return 'text-amber-700 font-semibold';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-left mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Deck</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Choose a Topic to Teach Bolt
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Bolt is sitting at his desk with empty RAM buffers. Pick any topic below to begin your lesson, test your recall, and expose your knowledge gaps.
        </p>
      </div>

      {/* Controls: Search and Category Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-teal-800 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts or topics..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Topic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-2xl glass-panel p-6 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 group text-left"
          >
            <div>
              {/* Clean metadata strip */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-slate-700">{topic.category}</span>
                <span aria-hidden="true">·</span>
                <span className={getDifficultyColor(topic.difficulty)}>{topic.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-500">{topic.concepts.length} Concepts</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                {topic.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                {topic.description}
              </p>
            </div>

            <div>
              {/* Mastery progress */}
              <div className="space-y-1.5 pt-4 border-t border-slate-200 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Your Mastery</span>
                  <span className="font-mono font-bold text-teal-700 tabular-nums">
                    {topic.mastery}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFx.playEurekaChime();
                    onSelectTopic(topic, 'standard');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <span>Teach Bolt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onSelectTopic(topic, 'age5');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 font-bold text-xs hover:bg-amber-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                  title="Feynman technique: explain at age 5 level without jargon"
                >
                  <Baby className="w-3.5 h-3.5 text-amber-700" />
                  <span>Age 5 Mode</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 p-8 rounded-2xl glass-panel">
          <p className="text-slate-500 text-sm">No topics found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-teal-700 underline font-medium cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
