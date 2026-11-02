import React, { useState } from 'react';
import { Compass, Sparkles, Lock, ArrowRight, CheckCircle2, Star, Zap, Award } from 'lucide-react';
import { Topic } from '../types';
import { soundFx } from '../utils/audio';

interface MasteryMapViewProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}

interface ConstellationNode {
  id: string;
  title: string;
  category: string;
  requiredMastery: string;
  isLocked: boolean;
  x: number; // percentage
  y: number; // percentage
  size: number;
  color: string;
  topicRef?: Topic;
}

export const MasteryMapView: React.FC<MasteryMapViewProps> = ({
  topics,
  onSelectTopic
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('photosynthesis');

  const nodes: ConstellationNode[] = [
    {
      id: 'photosynthesis',
      title: 'Photosynthesis',
      category: 'Biology',
      requiredMastery: 'Unlocked',
      isLocked: false,
      x: 32,
      y: 35,
      size: 58,
      color: '#059669',
      topicRef: topics.find(t => t.id === 'photosynthesis')
    },
    {
      id: 'newton-laws',
      title: "Newton's Laws",
      category: 'Physics',
      requiredMastery: 'Unlocked',
      isLocked: false,
      x: 68,
      y: 28,
      size: 54,
      color: '#0284C7',
      topicRef: topics.find(t => t.id === 'newton-laws')
    },
    {
      id: 'water-cycle',
      title: 'Water Cycle',
      category: 'Earth Science',
      requiredMastery: 'Unlocked',
      isLocked: false,
      x: 24,
      y: 65,
      size: 62,
      color: '#2563EB',
      topicRef: topics.find(t => t.id === 'water-cycle')
    },
    {
      id: 'fractions-and-decimals',
      title: 'Fractions',
      category: 'Mathematics',
      requiredMastery: 'Unlocked',
      isLocked: false,
      x: 74,
      y: 68,
      size: 64,
      color: '#D97706',
      topicRef: topics.find(t => t.id === 'fractions-and-decimals')
    },
    {
      id: 'how-the-internet-works',
      title: 'Internet Architecture',
      category: 'Technology',
      requiredMastery: 'Unlocked',
      isLocked: false,
      x: 50,
      y: 80,
      size: 50,
      color: '#7C3AED',
      topicRef: topics.find(t => t.id === 'how-the-internet-works')
    },
    {
      id: 'cellular-resp',
      title: 'Cellular Respiration',
      category: 'Biology',
      requiredMastery: 'Requires 85% Photosynthesis',
      isLocked: true,
      x: 18,
      y: 18,
      size: 40,
      color: '#94A3B8'
    },
    {
      id: 'quantum-comp',
      title: 'Quantum Computing',
      category: 'Advanced Tech',
      requiredMastery: 'Requires 80% Internet Architecture',
      isLocked: true,
      x: 82,
      y: 18,
      size: 40,
      color: '#94A3B8'
    },
    {
      id: 'relativity',
      title: 'General Relativity',
      category: 'Cosmology',
      requiredMastery: "Requires 80% Newton's Laws",
      isLocked: true,
      x: 85,
      y: 48,
      size: 40,
      color: '#94A3B8'
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleNodeClick = (node: ConstellationNode) => {
    soundFx.playClick();
    setSelectedNodeId(node.id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Cosmic Skill Galaxy</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Knowledge Mastery Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Each planet glows brighter as you teach Bolt with deeper clarity. Teach to unlock new scientific constellations!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span>Active Planet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Locked Constellation</span>
          </div>
        </div>
      </div>

      {/* Main Galaxy Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Interactive SVG Canvas */}
        <div className="lg:col-span-8 rounded-3xl glass-panel-elevated p-6 relative min-h-[560px] overflow-hidden border border-slate-300 shadow-md">
          {/* Subtle light cosmic background */}
          <div className="absolute inset-0 bg-slate-100/90 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          {/* SVG Orbit lines & links */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <circle cx="50%" cy="50%" r="140" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.8" />
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.6" />

            <line x1="50%" y1="50%" x2="32%" y2="35%" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />
            <line x1="50%" y1="50%" x2="68%" y2="28%" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />
            <line x1="50%" y1="50%" x2="24%" y2="65%" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />
            <line x1="50%" y1="50%" x2="74%" y2="68%" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />
            <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />

            <line x1="32%" y1="35%" x2="18%" y2="18%" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="68%" y1="28%" x2="82%" y2="18%" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="68%" y1="28%" x2="85%" y2="48%" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 3" />
          </svg>

          {/* Center Core: Wisdom Sun */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none select-none z-10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 shadow-[0_0_40px_rgba(13,148,136,0.35)] flex items-center justify-center border-2 border-white">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <span className="font-display text-[11px] font-bold tracking-wider uppercase text-teal-800 mt-2 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-xs">
              Wisdom Core
            </span>
          </div>

          {/* Interactive Topic Planets */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const mastery = node.topicRef?.mastery || 0;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${node.size}px`,
                  height: `${node.size}px`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 z-20 flex items-center justify-center group ${
                  node.isLocked
                    ? 'opacity-65 hover:opacity-100'
                    : 'hover:scale-115'
                }`}
              >
                {!node.isLocked && (
                  <div
                    className="absolute inset-[-6px] rounded-full transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${node.color}40 0%, transparent 70%)`,
                      opacity: mastery / 100
                    }}
                  />
                )}

                {isSelected && (
                  <div
                    className="absolute inset-[-8px] rounded-full border-2 border-dashed border-teal-600 animate-spin [animation-duration:12s]"
                  />
                )}

                {/* Planet Body */}
                <div
                  className="w-full h-full rounded-full border-2 flex items-center justify-center relative shadow-md overflow-hidden transition-transform"
                  style={{
                    backgroundColor: node.isLocked ? '#E2E8F0' : node.color,
                    borderColor: isSelected ? '#0D9488' : '#FFFFFF',
                    boxShadow: !node.isLocked ? `0 4px 14px ${node.color}55` : 'none'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/30" />

                  {node.isLocked ? (
                    <Lock className="w-4 h-4 text-slate-500 relative z-10" />
                  ) : (
                    <span className="text-white font-extrabold font-mono text-xs relative z-10 drop-shadow-xs">
                      {mastery}%
                    </span>
                  )}
                </div>

                <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold transition-colors ${
                  isSelected ? 'text-teal-900 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column (4 cols): Selected Planet Details Panel */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-elevated p-6 border border-slate-200 shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            <Star className="w-4 h-4" />
            <span>Orbital Station Intel</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-slate-900">
            {selectedNode.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-5">
            <span className="font-bold text-slate-700">{selectedNode.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedNode.isLocked ? 'Constellation Locked' : 'Active Orbit'}</span>
          </div>

          {selectedNode.topicRef ? (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedNode.topicRef.description}
              </p>

              {/* Mastery bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Recorded Mastery</span>
                  <span className="font-mono font-bold text-teal-700 text-sm">
                    {selectedNode.topicRef.mastery}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                    style={{ width: `${selectedNode.topicRef.mastery}%` }}
                  />
                </div>
              </div>

              {/* Concept nodes list */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  Key Concepts Orbiting:
                </span>
                <div className="space-y-1.5">
                  {selectedNode.topicRef.concepts.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  soundFx.playEurekaChime();
                  onSelectTopic(selectedNode.topicRef!);
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 cursor-pointer"
              >
                <span>Launch Teaching Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Constellation Locked</span>
                </div>
                <p>
                  To unlock {selectedNode.title}, deepen Bolt's understanding of foundational topics first!
                </p>
                <div className="pt-2 text-[11px] font-mono text-cyan-800 font-semibold">
                  Requirement: {selectedNode.requiredMastery}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Continue teaching active topics to accumulate enough comprehension photons to ignite this star system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
