export type UnitId =
  | 'fundamentals'
  | 'boolean-algebra'
  | 'minimization'
  | 'combinational'
  | 'sequential'
  | 'registers'
  | 'counters'
  | 'adc-dac'
  | 'logic-families';

export interface TopicDiagram {
  id: string;
  title: string;
  type: 'schematic' | 'waveform' | 'truth-table' | 'block-diagram' | 'state-diagram' | 'transistor';
  caption: string;
  svgType: string;
  keySignals?: { name: string; description: string; state?: string }[];
  steps?: string[];
}

export interface LectureSection {
  id: string;
  title: string;
  subtitle?: string;
  lectureNumber?: string;
  content: string;
  formula?: string;
  keyPoints?: string[];
  callout?: {
    type: 'theorem' | 'tip' | 'warning' | 'info';
    title: string;
    text: string;
  };
  chalkboardNote?: string;
  keyFormulas?: string[];
  bulletPoints?: string[];
}

export interface ProfessorNote {
  teachingTip: string;
  chalkboardSummary: string[];
  mnemonicRule?: string;
  examinerTrap: string;
}

export interface InteractiveCheck {
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface TopicItem {
  id: string;
  slug: string;
  unitId: UnitId;
  unitTitle: string;
  unitNumber: number;
  chapterNumber: number;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  
  // Detailed Learning Content
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  beginnerExplanation: string;
  deepTechnicalExplanation: string;
  technicalDefinition: string;
  workingPrinciple: string;
  mathematicalExplanation?: {
    equations: string[];
    derivationSteps?: string[];
  };
  truthTable?: {
    headers: string[];
    rows: (string | number)[][];
    notes?: string;
  };
  timingExplanation?: string;
  solvedProblems: {
    question: string;
    solution: string;
    explanation: string;
  }[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  commonMistakes: string[];
  examPoints: string[];
  vivaQuestions: {
    question: string;
    answer: string;
  }[];
  relatedTopicSlugs: string[];

  // Professional Masterclass Lecture Extensions
  lectureSections?: LectureSection[];
  diagrams?: TopicDiagram[];
  professorNotes?: ProfessorNote;
  interactiveChecks?: InteractiveCheck[];
}

export interface UnitInfo {
  id: UnitId;
  number: number;
  title: string;
  description: string;
  topicCount: number;
  iconName: string;
  color: string;
}

export type QuestionType = 'mcq' | 'true-false' | 'numerical' | 'viva';
export type QuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'University' | 'Interview' | 'Viva';

export interface Question {
  id: string;
  unitId: UnitId;
  topicSlug: string;
  topicName: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  examOrigin?: string; // e.g., "GATE CSE", "University Finals", "Hardware Interview"
}

export interface FormulaItem {
  id: string;
  name: string;
  category: 'Boolean Laws' | 'Arithmetic & Complement' | 'Timing & Clocks' | 'Counters' | 'ADC & DAC' | 'Logic Families';
  formula: string;
  meaning: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  whenToUse: string;
  example: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: string;
  simpleDef: string;
  technicalDef: string;
  example: string;
  relatedTerms: string[];
}

export type ColorTheme = 'blue' | 'emerald' | 'violet' | 'cyan' | 'amber' | 'crimson';

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Textbook' | 'Open Course' | 'Simulation Tool' | 'Reference Manual' | 'Lecture Notes';
  authorOrProvider: string;
  badge: 'FREE' | 'OPEN COURSE' | 'REFERENCE' | 'TOOL';
  url: string;
  description: string;
  recommendedFor: string;
}

export interface UserProgress {
  completedTopicSlugs: string[];
  bookmarkedItemIds: {
    type: 'topic' | 'question' | 'formula' | 'resource';
    id: string;
    title: string;
  }[];
  quizAttempts: {
    id: string;
    date: string;
    unitId?: string;
    score: number;
    total: number;
    timeSpentSeconds: number;
  }[];
  notes: Record<string, string>; // topicSlug -> personal notes
  theme: 'light' | 'dark';
  colorTheme?: ColorTheme;
}
