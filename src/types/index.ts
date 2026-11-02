export type BoltExpression = 'curious' | 'confused' | 'happy' | 'mind-blown' | 'thinking';

export interface ConceptItem {
  id: string;
  name: string;
  shortDesc: string;
  requiredKeywords: string[];
  misconception: string;
  revision: {
    intuition: string;
    analogy: string;
    keyTakeaway: string;
    quickTestQuestion: string;
  };
}

export interface ScriptedTurn {
  triggerKeywords?: string[];
  requiredMissingConceptId?: string;
  boltResponse: string;
  expression: BoltExpression;
  understandingDelta: number; // e.g. +15, -10
  unlockedConceptIds?: string[];
}

export interface Topic {
  id: string;
  title: string;
  category: 'Biology' | 'Physics' | 'Technology' | 'Mathematics' | 'Earth Science';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mastery: number; // 0-100
  description: string;
  age5Prompt: string;
  starterPrompt: string;
  boltGreeting: string;
  concepts: ConceptItem[];
  hints: string[];
  quickPrompts: string[];
  scriptedTurns: ScriptedTurn[];
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'bolt' | 'system';
  text: string;
  timestamp: string;
  expression?: BoltExpression;
  conceptsMentioned?: string[];
  jargonFound?: string[];
}

export interface SessionResult {
  topicId: string;
  topicTitle: string;
  date: string;
  score: number;
  meterValue: number;
  explainedWell: ConceptItem[];
  shakyConcepts: ConceptItem[];
  missedConcepts: ConceptItem[];
  radarScores: {
    clarity: number;
    mechanism: number;
    vocabulary: number;
    simplicity: number;
    examples: number;
  };
  totalTurns: number;
  jargonCount: number;
}

export interface StudentProfile {
  name: string;
  role: 'student' | 'teacher';
  grade: string;
  streakDays: number;
  streakActive: boolean;
  totalSessionsCompleted: number;
  unlockedBadges: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'teaching' | 'mastery' | 'streak';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TeacherStudentSummary {
  id: string;
  name: string;
  avatar: string;
  currentTopic: string;
  mastery: number;
  status: 'Struggling' | 'On Track' | 'Excelling';
  stuckConcept: string;
  lastActive: string;
}
