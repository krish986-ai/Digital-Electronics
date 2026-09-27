import React, { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  Binary,
  Layers,
  Zap,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Sliders,
  Award,
  Palette,
  RotateCw,
  Activity,
  GitCommit,
  Grid,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { UNITS } from '../content/units';
import { ALL_TOPICS } from '../content/topics';
import { ColorTheme } from '../types';
import { COLOR_THEMES, getThemeConfig } from '../lib/theme';

interface HomePageProps {
  onNavigateTab: (tab: string) => void;
  onSelectTopic: (slug: string) => void;
  completedTopicSlugs: string[];
  colorTheme?: ColorTheme;
  onSelectColorTheme?: (theme: ColorTheme) => void;
  onSelectUnit?: (unitId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  onSelectTopic,
  completedTopicSlugs,
  colorTheme = 'blue',
  onSelectColorTheme,
  onSelectUnit,
}) => {
  const [analogFreq, setAnalogFreq] = useState(2);
  const [noiseLevel, setNoiseLevel] = useState(0.2);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentThemeConfig = getThemeConfig(colorTheme);

  // Distinct rich color styles for each of the 9 units
  const unitColorMap: Record<string, { bgIcon: string; textIcon: string; badge: string; accentBorder: string; gradient: string }> = {
    'fundamentals': {
      bgIcon: 'bg-blue-100 dark:bg-blue-950/60',
      textIcon: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
      accentBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
      gradient: 'from-blue-600 to-cyan-500',
    },
    'boolean-algebra': {
      bgIcon: 'bg-indigo-100 dark:bg-indigo-950/60',
      textIcon: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      accentBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500',
      gradient: 'from-indigo-600 to-blue-600',
    },
    'minimization': {
      bgIcon: 'bg-teal-100 dark:bg-teal-950/60',
      textIcon: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
      accentBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
      gradient: 'from-teal-600 to-emerald-500',
    },
    'combinational': {
      bgIcon: 'bg-emerald-100 dark:bg-emerald-950/60',
      textIcon: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
      accentBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
      gradient: 'from-emerald-600 to-teal-500',
    },
    'sequential': {
      bgIcon: 'bg-amber-100 dark:bg-amber-950/60',
      textIcon: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
      accentBorder: 'hover:border-amber-400 dark:hover:border-amber-500',
      gradient: 'from-amber-600 to-orange-500',
    },
    'registers': {
      bgIcon: 'bg-rose-100 dark:bg-rose-950/60',
      textIcon: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
      accentBorder: 'hover:border-rose-400 dark:hover:border-rose-500',
      gradient: 'from-rose-600 to-pink-500',
    },
    'counters': {
      bgIcon: 'bg-purple-100 dark:bg-purple-950/60',
      textIcon: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
      accentBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
      gradient: 'from-purple-600 to-violet-500',
    },
    'adc-dac': {
      bgIcon: 'bg-sky-100 dark:bg-sky-950/60',
      textIcon: 'text-sky-600 dark:text-sky-400',
      badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
      accentBorder: 'hover:border-sky-400 dark:hover:border-sky-500',
      gradient: 'from-sky-600 to-blue-500',
    },
    'logic-families': {
      bgIcon: 'bg-slate-200 dark:bg-slate-800',
      textIcon: 'text-slate-700 dark:text-slate-300',
      badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      accentBorder: 'hover:border-slate-400 dark:hover:border-slate-600',
      gradient: 'from-slate-700 to-slate-900',
    },
  };

  const getUnitIcon = (unitId: string) => {
    switch (unitId) {
      case 'fundamentals':
        return <Binary className="h-5 w-5" />;
      case 'boolean-algebra':
        return <GitCommit className="h-5 w-5" />;
      case 'minimization':
        return <Grid className="h-5 w-5" />;
      case 'combinational':
        return <Cpu className="h-5 w-5" />;
      case 'sequential':
        return <Layers className="h-5 w-5" />;
      case 'registers':
        return <Layers className="h-5 w-5" />;
      case 'counters':
        return <RotateCw className="h-5 w-5" />;
      case 'adc-dac':
        return <Activity className="h-5 w-5" />;
      case 'logic-families':
        return <Zap className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  const faqs = [
    {
      q: 'Is DigiLearn truly 100% free with no hidden paywalls?',
      a: 'Yes. Every topic explanation, interactive circuit simulation, K-map solver, question bank, and formula reference is completely free and accessible without requiring an account or credit card.',
    },
    {
      q: 'Does the curriculum cover university engineering syllabi and competitive exams like GATE?',
      a: 'Absolutely. The curriculum spans from introductory boolean gates to advanced multi-bit synchronous counters, state machines, logic families (TTL/CMOS/ECL), and ADC/DAC converters. Question banks include problems from university finals and GATE exams.',
    },
    {
      q: 'How does the "Beginner" vs. "Deep Technical" mode work?',
      a: 'Each topic page features a toggle between intuitive real-world analogies (ideal for first-time learners) and rigorous semiconductor physics, mathematical derivations, and setup/hold timing diagrams (for exams and interviews).',
    },
    {
      q: 'Can I track my learning progress without logging in?',
      a: 'Yes. DigiLearn automatically saves your completed topics, quiz performance, notes, and bookmarks to your browser’s LocalStorage, keeping your progress 100% private.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Vibrant High Contrast */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50/70 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Visual Theme Palette Selector Pill Bar */}
          {onSelectColorTheme && (
            <div className="mb-8 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold">
                  <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Active Theme:</span>
                  <span className={`px-2.5 py-0.5 rounded-md font-extrabold ${currentThemeConfig.badgeClass}`}>
                    {currentThemeConfig.name}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium hidden sm:inline">— {currentThemeConfig.tagline}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-[11px] mr-1 hidden lg:inline">Pick Color Accent:</span>
                  {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((key) => {
                    const cfg = COLOR_THEMES[key];
                    const isSelected = colorTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => onSelectColorTheme(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm scale-105 ring-2 ring-blue-500'
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                        }`}
                        title={cfg.tagline}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/20"
                          style={{ backgroundColor: cfg.dotColor }}
                        />
                        <span>{cfg.shortName}</span>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-950 px-3.5 py-1 rounded-full border border-blue-400 dark:border-blue-700">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping" />
                Free Academic Engineering Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white font-display leading-[1.08]">
                DIGITAL ELECTRONICS
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 mt-2.5">
                  From Logic Gates to Processors — Learn Everything.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl leading-relaxed font-normal">
                Free, detailed, interactive Digital Electronics resources for students, engineers, and electronics enthusiasts. Understand fundamental principles, simulate live circuits, solve K-maps, and master university & GATE exams.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateTab('learn')}
                  className={`flex items-center gap-2 rounded-xl ${currentThemeConfig.btnPrimary} px-6 py-3.5 text-sm font-extrabold shadow-md transition-all cursor-pointer`}
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigateTab('lab')}
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 transition-colors shadow-xs cursor-pointer"
                >
                  <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Interactive Lab</span>
                </button>

                <button
                  onClick={() => onNavigateTab('solvers')}
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 transition-colors shadow-xs cursor-pointer"
                >
                  <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>K-Map & Solvers</span>
                </button>

                <button
                  onClick={() => onNavigateTab('practice')}
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 transition-colors shadow-xs cursor-pointer"
                >
                  <Award className="h-4 w-4 text-amber-500" />
                  <span>Practice Questions</span>
                </button>
              </div>

              {/* Verified Features Checklist */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <CheckCircle className="h-4 w-4 text-emerald-600" /> 100% Free
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <ShieldCheck className="h-4 w-4 text-blue-600" /> No Login Required
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <Cpu className="h-4 w-4 text-indigo-600" /> Live Interactive Simulators
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <Sparkles className="h-4 w-4 text-amber-500" /> University & GATE Aligned
                </span>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-blue-200 dark:border-slate-800 bg-slate-900 p-2 shadow-xl overflow-hidden group">
                <img
                  src="/src/assets/images/hero_digital_circuits_1790334171469.jpg"
                  alt="Digital Electronics Logic Circuit Architecture"
                  className="rounded-xl w-full object-cover h-[340px] opacity-95 group-hover:opacity-100 transition-opacity"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none rounded-xl" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-mono mb-1">
                    <span>LIVE LOGIC ENGINE</span>
                    <span className="text-emerald-400 font-semibold">STATUS: READY</span>
                  </div>
                  <div className="text-sm font-semibold text-white font-display">
                    Interactive Silicon Waveforms & Truth Synthesizers
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Explore real-time propagation delays, flip-flop state transitions, and K-map groups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar with Clean White Elevated Cards */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Detailed Topics</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                15+
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Interactive Simulators</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
                80+
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Exam & Viva Questions</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                40+
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Formula References</div>
            </div>
            <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                100%
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Free & Open Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Section: What is Digital Electronics? */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Section 1 · Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-display mt-1">
              What is Digital Electronics?
            </h2>
            <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 leading-relaxed font-medium">
              Analog signals are continuous voltages prone to accumulating physical noise with every stage. Digital circuits restore and regenerate discrete binary 1s and 0s using saturation thresholds. Adjust the noise below to see why digital signals survive electrical interference!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 shadow-xs">
            {/* Interactive Control Deck */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                  <span>Wave Frequency: {analogFreq} Hz</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={analogFreq}
                  onChange={(e) => setAnalogFreq(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                  <span>Injected Noise Amplitude: {Math.round(noiseLevel * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
                <div className="font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Threshold Regeneration</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-medium">
                  Notice how the bottom square wave remains completely crisp and error-free even when the continuous analog top signal has severe electrical fluctuations.
                </p>
              </div>
            </div>

            {/* Live Interactive SVG Waveform Display */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>Continuous Analog Voltage with Noise Accumulation</span>
                  <span className="text-amber-400">V_in(t)</span>
                </div>
                <svg viewBox="0 0 500 80" className="w-full h-20">
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="4 4" />
                  <path
                    d={Array.from({ length: 100 })
                      .map((_, i) => {
                        const x = i * 5;
                        const t = (i / 100) * analogFreq * Math.PI * 2;
                        const noise = Math.sin(i * 12.3) * noiseLevel * 25;
                        const y = 40 - Math.sin(t) * 28 + noise;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${Math.max(5, Math.min(75, y))}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>Regenerated Digital Signal (Clean 0 / 1)</span>
                  <span className="text-blue-400 font-semibold">Quantized Binary</span>
                </div>
                <svg viewBox="0 0 500 80" className="w-full h-20">
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="4 4" />
                  <path
                    d={Array.from({ length: 100 })
                      .map((_, i) => {
                        const x = i * 5;
                        const t = (i / 100) * analogFreq * Math.PI * 2;
                        const isHigh = Math.sin(t) >= 0;
                        const y = isHigh ? 16 : 64;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full Curriculum: 9 Units Grid with Distinct Vibrant Colors */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Curriculum Structure
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-display mt-1">
                9 Comprehensive Learning Units
              </h2>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 font-medium">
                From semiconductor switching to 64-state synchronous counters and ADC/DAC converters.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('learn')}
              className={`inline-flex items-center gap-1.5 text-sm font-extrabold ${currentThemeConfig.textPrimary} hover:underline cursor-pointer`}
            >
              <span>View Full Syllabus</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNITS.map((unit) => {
              const unitTopics = ALL_TOPICS.filter((t) => t.unitId === unit.id);
              const completedCount = unitTopics.filter((t) =>
                completedTopicSlugs.includes(t.slug)
              ).length;
              const percent = unitTopics.length > 0 ? Math.round((completedCount / unitTopics.length) * 100) : 0;
              const colorInfo = unitColorMap[unit.id] || unitColorMap['fundamentals'];

              return (
                <div
                  key={unit.id}
                  className={`group relative rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm ${colorInfo.accentBorder} hover:shadow-md transition-all flex flex-col justify-between overflow-hidden`}
                >
                  {/* Unit Top Colored Accent Stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colorInfo.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-4 mt-1">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorInfo.bgIcon} ${colorInfo.textIcon} transition-transform group-hover:scale-110 shadow-xs`}>
                        {getUnitIcon(unit.id)}
                      </div>
                      <span className={`font-mono text-xs font-black px-2.5 py-0.5 rounded-full border ${colorInfo.badge}`}>
                        UNIT {unit.number.toString().padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-6 font-medium">
                      {unit.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>Progress</span>
                        <span>{completedCount}/{unitTopics.length} Topics ({percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div
                          className={`h-full bg-gradient-to-r ${colorInfo.gradient} rounded-full transition-all`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onSelectUnit) {
                          onSelectUnit(unit.id);
                        }
                        onNavigateTab('learn');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 transition-colors cursor-pointer"
                    >
                      <span>Explore Unit</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Popular Topics Direct Access */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              High-Yield Concepts
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-display mt-1">
              Most Visited Engineering Topics
            </h2>
            <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 font-medium">
              Start with these essential topics heavily tested in university exams and tech hardware interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_TOPICS.slice(0, 6).map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.slug)}
                className="group cursor-pointer rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-5 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-extrabold text-blue-700 dark:text-blue-400">Unit {topic.unitNumber}</span>
                    <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{topic.estimatedMinutes} min read</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors font-display">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2 mt-2 leading-relaxed font-medium">
                    {topic.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex gap-1.5">
                    {topic.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Study <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Lab & Solvers Showcase */}
      <section className="py-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Silicon Laboratory in Your Browser
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                Simulate Logic Circuits, Solve K-Maps & Analyze Waveforms.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Theory without experiment is incomplete. Toggle logic gate inputs, watch live animated signal wires, pulse clock triggers into Master-Slave flip-flops, and let our K-map engine group minterms with step-by-step mathematical proofs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                    <Grid className="h-4 w-4 text-teal-400" />
                    <span>K-Map Solver</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    2, 3 & 4 variables with don't-care grouping and minimal SOP output.
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-blue-400" />
                    <span>Boolean Evaluator</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Truth tables, canonical minterms/maxterms for any formula.
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                    <Binary className="h-4 w-4 text-amber-400" />
                    <span>Radix & Complement</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Multi-base conversions, 1s/2s complement signed arithmetic.
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
                  <div className="font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-rose-400" />
                    <span>Engineering Calcs</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    ADC/DAC step size, 555 timer duty cycles, max clock frequencies.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab('lab')}
                  className={`flex items-center gap-2 rounded-xl ${currentThemeConfig.btnPrimary} px-6 py-3 text-sm font-semibold transition-all cursor-pointer`}
                >
                  <span>Launch Interactive Lab</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl">
                <img
                  src="/src/assets/images/lab_breadboard_chips_1790334183754.jpg"
                  alt="Interactive Digital Electronics Circuit Lab"
                  className="rounded-xl w-full h-[320px] object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 border-b border-blue-100/80 dark:border-slate-800/80 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm text-slate-900 dark:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-16 bg-slate-50/80 dark:bg-slate-950 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Ready to Master Digital Electronics?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Start from Unit 1 or dive straight into specific combinational and sequential circuit design. Zero sign-up required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigateTab('learn')}
              className={`rounded-xl ${currentThemeConfig.btnPrimary} px-6 py-3 text-sm font-semibold shadow-md transition-all cursor-pointer`}
            >
              Start Learning Now
            </button>
            <button
              onClick={() => onNavigateTab('practice')}
              className="rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Test Your Knowledge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
