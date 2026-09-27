import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Clock,
  Share2,
  Check,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Compass,
  Layers,
  BookOpen,
  Award,
  Sparkles,
  Zap,
  List,
  PenTool,
  CheckCircle2,
  XCircle,
  GraduationCap,
} from 'lucide-react';
import { TopicItem } from '../types';
import { ALL_TOPICS } from '../content/topics';
import { TruthTable } from '../components/TruthTable';
import { CircuitDiagram, CircuitType } from '../components/CircuitDiagram';
import { EngineeringDiagram } from '../components/EngineeringDiagrams';

interface TopicDetailPageProps {
  topic: TopicItem;
  onBack: () => void;
  onNavigateTopic: (slug: string) => void;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const TopicDetailPage: React.FC<TopicDetailPageProps> = ({
  topic,
  onBack,
  onNavigateTopic,
  isCompleted,
  onToggleCompleted,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [explanationDepth, setExplanationDepth] = useState<'beginner' | 'deep'>('deep');
  const [shared, setShared] = useState(false);
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizHint, setShowQuizHint] = useState<Record<number, boolean>>({});
  const [activeDiagramIndex, setActiveDiagramIndex] = useState(0);

  // Scroll to top on mount or topic change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveQuizAnswers({});
    setShowQuizHint({});
    setActiveDiagramIndex(0);
  }, [topic.slug]);

  // Find previous and next topic
  const currentIndex = ALL_TOPICS.findIndex((t) => t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? ALL_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentIndex + 1] : null;

  // Determine if this topic has a matching circuit simulator
  let circuitSimType: CircuitType | null = null;
  if (topic.slug.includes('logic-gates')) circuitSimType = 'AND';
  else if (topic.slug.includes('adders')) circuitSimType = 'FULL_ADDER';
  else if (topic.slug.includes('sr-jk') || topic.slug.includes('latches')) circuitSimType = 'SR_LATCH';
  else if (topic.slug.includes('d-and-t') || topic.slug.includes('flip-flops')) circuitSimType = 'D_FLIP_FLOP';

  // Determine all engineering diagrams for this topic
  const getAllEngineeringDiagrams = (): { id: string; title: string; caption: string }[] => {
    if (topic.diagrams && topic.diagrams.length > 0) {
      return topic.diagrams.map((d) => ({
        id: d.svgType,
        title: d.title,
        caption: d.caption,
      }));
    }

    if (topic.slug.includes('intro-to-digital') || topic.slug.includes('logic-levels')) {
      return [{
        id: 'LOGIC_LEVELS_VTC',
        title: 'Driver Output vs Receiver Input Threshold Voltage Bands & Noise Margins',
        caption: 'Signal integrity requires that driver output exceeds receiver threshold by at least NM_H and NM_L. Any voltage between V_IL and V_IH triggers the forbidden indeterminate state.',
      }];
    }
    if (topic.slug.includes('number-systems')) {
      return [{
        id: 'RADIX_NIBBLE_MAP',
        title: 'Direct 4-Bit Nibble Grouping Architecture (Binary ↔ Hexadecimal)',
        caption: 'Because 16 = 2^4, each hexadecimal character directly maps to 4 binary register bits. Notice how grouping starts from the radix point and moves outward in both directions without intermediate decimal conversion.',
      }];
    }
    if (topic.slug.includes('complement') || topic.slug.includes('arithmetic')) {
      return [{
        id: 'TWOS_COMPLEMENT_RING',
        title: '4-Bit Modulo-16 2\'s Complement Wheel & Hardware Overflow Boundary',
        caption: 'The wheel illustrates modular wrapping: adding +1 to +7 (0111) flips the MSB to 1000 (-8), triggering the signed overflow flag V = C_in(MSB) ⊕ C_out(MSB) = 1.',
      }];
    }
    if (topic.slug.includes('boolean-algebra') || topic.slug.includes('demorgan')) {
      return [{
        id: 'DEMORGAN_AND_BUBBLE_LOGIC',
        title: "De Morgan's Equivalent Bubble Gate Transforms (Active-High vs Active-Low)",
        caption: "NAND Gate is functionally identical to a Bubbled OR Gate: (A · B)' = A' + B'. NOR Gate is identical to a Bubbled AND Gate: (A + B)' = A' · B'.",
      }];
    }
    if (topic.slug.includes('logic-gates')) {
      return [{
        id: 'LOGIC_GATES_PINOUT_AND_WAVEFORMS',
        title: 'Logic Gate Standard Symbols, Timing Delay & 7400 Pinout',
        caption: 'ANSI/IEEE logic symbols, propagation delay waveforms t_PLH/t_PHL, and DIP-14 pinout for 74HC00.',
      }];
    }
    if (topic.slug.includes('universal-gates')) {
      return [{
        id: 'UNIVERSAL_GATES_EQUIVALENTS',
        title: 'Universal Gate Implementation Matrix (NAND & NOR Only)',
        caption: 'Step-by-step schematics and gate counts for implementing NOT, AND, OR, and XOR using exclusively NAND and exclusively NOR gates.',
      }];
    }
    if (topic.slug.includes('dont-care')) {
      return [{
        id: 'DONT_CARE_BCD_MAP',
        title: "Don't-Care Optimization in BCD-to-7-Segment Decoder K-Map",
        caption: "Diagram illustrating how illegal BCD states (1010 to 1111) are assigned as X to enlarge groups into 8-cell octets.",
      }];
    }
    if (topic.slug.includes('quine-mccluskey')) {
      return [{
        id: 'QUINE_MCCLUSKEY_FLOWCHART',
        title: 'Quine-McCluskey Prime Implicant Selection Chart & Algorithmic Flow',
        caption: 'Tabular minimization flow: Grouping by number of 1s, bit-difference dash merging, and Prime Implicant coverage table.',
      }];
    }
    if (topic.slug.includes('karnaugh') || topic.slug.includes('minimization')) {
      return [{
        id: 'KMAP_4VAR_OCTET',
        title: '4-Variable Karnaugh Map Adjacency Grid (Octet & Quad Minimization)',
        caption: 'Using Gray code column/row sequencing (00, 01, 11, 10), adjacent cells differ by only 1 bit. An 8-cell octet eliminates 3 variables, yielding a minimal single-literal product term.',
      }];
    }
    if (topic.slug.includes('adder') || topic.slug.includes('subtractor')) {
      return [{
        id: 'HALF_FULL_ADDER_SCHEMATIC',
        title: 'Full Adder Architecture Built from Two Cascaded Half Adders & OR Gate',
        caption: 'The first Half Adder computes intermediate Sum S1 = A ⊕ B and Carry C1 = A·B. The second Half Adder combines S1 with C_in to produce the final Sum, while the OR gate merges both carry branches.',
      }];
    }
    if (topic.slug.includes('multiplexer') || topic.slug.includes('demultiplexer')) {
      return [{
        id: 'MULTIPLEXER_4TO1_INTERNAL',
        title: '4-to-1 Multiplexer Internal Logic Schematic & AND-OR Tree',
        caption: "Schematic showing 2 select inverters, 4 three-input AND gates, and a final OR gate implementing Y = S1'S0'D0 + S1'S0D1 + S1S0'D2 + S1S0D3.",
      }];
    }
    if (topic.slug.includes('decoder') || topic.slug.includes('encoder')) {
      return [{
        id: 'DECODER_3TO8_ACTIVE_LOW',
        title: '74HC138 3-to-8 Line Decoder with Active-LOW Outputs & Enable Gating',
        caption: 'Internal structure featuring 3-pin enable gating (G1, /G2A, /G2B) and eight active-low outputs for address decoding.',
      }];
    }
    if (topic.slug.includes('sr-jk') || topic.slug.includes('master-slave')) {
      return [{
        id: 'SR_AND_JK_MASTER_SLAVE',
        title: 'Master-Slave JK Flip-Flop Architecture & Feedback Paths',
        caption: 'Circuit schematic illustrating how the master stage (clocked by CLK) and slave stage (clocked by inverted CLK) completely prevent race-around.',
      }];
    }
    if (topic.slug.includes('latches') || topic.slug.includes('flip-flop')) {
      return [{
        id: 'D_FLIP_FLOP_TIMING',
        title: 'Edge-Triggered D Flip-Flop: Setup Time, Hold Time & Propagation Delay Timing',
        caption: 'Data D must arrive at least t_setup before the rising clock edge and remain stable for t_hold after the edge. Violating this setup/hold aperture forces the bistable latch into metastability.',
      }];
    }
    if (topic.slug.includes('shift-register')) {
      return [{
        id: 'SHIFT_REGISTERS_4MODES',
        title: 'Shift Register Configurations (SISO, SIPO, PISO, PIPO) & 74194 Modes',
        caption: 'Architectural comparison of serial vs parallel data movement latencies and 74HC194 universal shift register control modes.',
      }];
    }
    if (topic.slug.includes('counter') || topic.slug.includes('ripple')) {
      return [
        {
          id: 'RIPPLE_COUNTER_4BIT_WAVEFORMS',
          title: '4-Bit Asynchronous Ripple Counter Timing Waveforms & Cumulative Latency',
          caption: 'Each flip-flop is clocked by the output of the preceding stage. While simple, the cumulative propagation delay (4 × t_pd) causes momentary output glitch spikes during state transitions.',
        },
        {
          id: 'SYNCHRONOUS_UP_DOWN_COUNTER',
          title: '4-Bit Synchronous Up Counter with Parallel Lookahead Carry Logic',
          caption: 'Parallel clocked design eliminating cumulative delay using common clock and high-speed T-gate carry chain.',
        }
      ];
    }
    if (topic.slug.includes('dac') || topic.slug.includes('adc') || topic.slug.includes('converter')) {
      return [
        {
          id: 'R2R_LADDER_DAC',
          title: '4-Bit R-2R Resistor Ladder DAC with Inverting Operational Amplifier',
          caption: 'By employing only two precision resistor values (R and 2R), each node acts as an exact current-divider by 2. The op-amp maintains virtual ground at the inverting summing node.',
        },
        {
          id: 'FLASH_ADC_COMPARATOR_LADDER',
          title: '3-Bit High-Speed Flash ADC with Resistor Ladder & Priority Encoder',
          caption: 'Ultra-fast 1-clock-cycle conversion using 7 analog comparators and 8-resistor reference voltage divider.',
        }
      ];
    }
    if (topic.slug.includes('logic-families') || topic.slug.includes('cmos') || topic.slug.includes('ttl')) {
      return [
        {
          id: 'CMOS_INVERTER_AND_VTC',
          title: 'CMOS Inverter Transistor Schematic & Voltage Transfer Characteristic (VTC)',
          caption: 'Composed of a complementary pair: PMOS pull-up network to V_DD and NMOS pull-down network to GND. In steady-state, one transistor is completely OFF, resulting in virtually zero static DC power dissipation.',
        },
        {
          id: 'TTL_NAND_7400_INTERNAL',
          title: 'Standard TTL 7400 NAND Gate with Multi-Emitter BJT & Totem-Pole Stage',
          caption: 'Bipolar transistor switching circuitry showing multi-emitter Q1 input, Q2 phase splitter, and Q3-Q4 totem-pole active driver.',
        }
      ];
    }

    return [];
  };

  const engineeringDiagrams = getAllEngineeringDiagrams();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // Height of sticky header + sticky jump bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    setActiveQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleHint = (qIdx: number) => {
    setShowQuizHint((prev) => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  // Default interactive checks if not present in topic data
  const defaultInteractiveChecks = [
    {
      question: `What is the fundamental condition that guarantees zero static current in a steady-state digital CMOS gate?`,
      options: [
        'The clock frequency is set to exactly 1 GHz.',
        'At any stable logic state (0 or 1), either the PMOS pull-up or NMOS pull-down network is completely turned OFF (cutoff).',
        'Both PMOS and NMOS conduct equally to balance the current.',
        'The input voltage is kept strictly at V_DD / 2.',
      ],
      correctIndex: 1,
      hint: 'Remember: static means when inputs are not changing.',
      explanation: 'In CMOS circuits, static power is near-zero because the PMOS (pull-up) and NMOS (pull-down) transistors are never turned ON simultaneously in steady state. Current only flows dynamically during switching transitions to charge/discharge parasitic load capacitance.',
    },
    {
      question: `Why is digital signaling vastly superior to continuous analog signaling for multi-stage computation?`,
      options: [
        'Analog signals cannot represent high voltages above 1 volt.',
        'Digital gates regenerate and restore discrete binary voltage levels at every stage, preventing physical noise from accumulating.',
        'Digital circuits do not require power supplies.',
        'Digital signals travel faster than the speed of light.',
      ],
      correctIndex: 1,
      hint: 'Think about threshold regeneration at each logic gate.',
      explanation: 'Analog circuits continuously amplify and accumulate physical noise at every cascaded stage. Digital logic gates exploit high nonlinear gain to snap noisy inputs back to clean saturated rail voltages (Logic 0 or Logic 1), providing regenerative noise immunity.',
    },
  ];

  const activeChecks = topic.interactiveChecks && topic.interactiveChecks.length > 0
    ? topic.interactiveChecks
    : defaultInteractiveChecks;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blue-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Curriculum Modules</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer shadow-2xs ${
              isBookmarked
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current text-blue-600' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
            title="Copy share link"
          >
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{shared ? 'Copied Link' : 'Share'}</span>
          </button>

          <button
            onClick={onToggleCompleted}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* 2. Topic Header & Academic Badges */}
      <div className="space-y-4 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold">
          <span className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700">
            Unit {topic.unitNumber}: {topic.unitTitle}
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Chapter {topic.chapterNumber}</span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
            <Clock className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" /> {topic.estimatedMinutes} min study
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
            {topic.difficulty} Level
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white font-display leading-[1.15]">
          {topic.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-4xl font-normal">
          {topic.overview}
        </p>

        {/* Learning Objectives Checklist */}
        <div className="mt-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-extrabold uppercase tracking-wider text-blue-900 dark:text-blue-200 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            <span>Course Learning Objectives (What You Will Master)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-850 dark:text-slate-100 font-medium">
            {topic.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section Navigation Quick Jump Pills */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-y-2 border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap">
          <span className="text-slate-700 dark:text-slate-300 font-black uppercase text-[10px] mr-1">Jump to:</span>
          <button
            type="button"
            onClick={(e) => scrollToSection(e, 'theory')}
            className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
          >
            📖 Theory & Principles
          </button>
          {engineeringDiagrams.length > 0 && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'diagram')}
              className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
            >
              📐 Circuit Schematics
            </button>
          )}
          {circuitSimType && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'simulator')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-black hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              ⚡ Live Simulator
            </button>
          )}
          {topic.truthTable && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'truthtable')}
              className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
            >
              📊 Truth Table
            </button>
          )}
          {topic.mathematicalExplanation && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'math')}
              className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
            >
              📝 Math Derivations
            </button>
          )}
          {topic.solvedProblems && topic.solvedProblems.length > 0 && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'problems')}
              className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
            >
              💡 Solved Problems
            </button>
          )}
          <button
            type="button"
            onClick={(e) => scrollToSection(e, 'blackboard')}
            className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition-colors shadow-xs cursor-pointer"
          >
            👨‍🏫 Blackboard Notes
          </button>
          <button
            type="button"
            onClick={(e) => scrollToSection(e, 'quiz')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
          >
            🧪 Self-Check Quiz
          </button>
          {topic.vivaQuestions && topic.vivaQuestions.length > 0 && (
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'viva')}
              className="px-3 py-1.5 rounded-lg border-2 border-slate-300 bg-white hover:border-blue-600 hover:text-blue-700 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 transition-colors shadow-xs font-bold cursor-pointer"
            >
              🏆 GATE & Viva Voce
            </button>
          )}
        </div>
      </div>

      {/* 4. Complete Professor Lecture Body (Theory & Physics) */}
      <section id="theory" className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-700 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
              Lecture Analysis & Core Engineering Principles
            </h2>
          </div>

          {/* Depth Mode Selector Pill */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setExplanationDepth('beginner')}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                explanationDepth === 'beginner'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Intuition / Analogies
            </button>
            <button
              onClick={() => setExplanationDepth('deep')}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                explanationDepth === 'deep'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Rigorous Engineering
            </button>
          </div>
        </div>

        {/* Dynamic Lecture Content Display */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-400">
            {explanationDepth === 'beginner' ? (
              <>
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>Physical Analogy & Intuitive Visualization</span>
              </>
            ) : (
              <>
                <Compass className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                <span>Semiconductor Physics & Rigorous Hardware Mechanism</span>
              </>
            )}
          </div>

          <div className="text-base sm:text-lg leading-relaxed text-slate-900 dark:text-slate-100 font-sans whitespace-pre-line space-y-4 font-normal">
            {explanationDepth === 'beginner'
              ? topic.beginnerExplanation
              : topic.deepTechnicalExplanation}
          </div>

          {/* Formal Definition & Physical Working Principle side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-300 dark:border-blue-700">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-950 dark:text-blue-200 block mb-1">
                Standard Engineering Definition
              </span>
              <p className="text-xs sm:text-sm text-slate-950 dark:text-slate-100 font-mono leading-relaxed font-bold">
                "{topic.technicalDefinition}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200 block mb-1">
                Hardware Working Principle
              </span>
              <p className="text-xs sm:text-sm text-slate-950 dark:text-slate-100 leading-relaxed font-sans font-medium">
                {topic.workingPrinciple}
              </p>
            </div>
          </div>

          {/* Deep-Dive Textbook Lecture Modules */}
          {topic.lectureSections && topic.lectureSections.length > 0 && (
            <div className="space-y-4 pt-6 border-t-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                <GraduationCap className="h-4 w-4" />
                <span>Classroom Lecture Deep-Dive Modules</span>
              </div>
              <div className="space-y-5">
                {topic.lectureSections.map((sec, sIdx) => (
                  <div
                    key={sec.id || sIdx}
                    className="p-6 sm:p-7 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-700 text-white font-mono text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                        {sIdx + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-display">
                        {sec.title}
                      </h3>
                    </div>

                    {sec.subtitle && (
                      <p className="text-xs text-blue-800 dark:text-blue-300 font-mono font-bold pl-10 -mt-2">
                        {sec.subtitle}
                      </p>
                    )}

                    <div className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 font-sans whitespace-pre-line pl-10 font-normal">
                      {sec.content}
                    </div>

                    {sec.formula && (
                      <div className="ml-10 p-3.5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm border-2 border-slate-800 overflow-x-auto shadow-inner font-semibold">
                        <code>{sec.formula}</code>
                      </div>
                    )}

                    {sec.keyPoints && sec.keyPoints.length > 0 && (
                      <div className="ml-10 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
                        <span className="text-[11px] font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide block font-mono">
                          Key Principles:
                        </span>
                        <ul className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside space-y-1 font-medium">
                          {sec.keyPoints.map((kp, kpIdx) => (
                            <li key={kpIdx}>{kp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {sec.callout && (
                      <div className={`ml-10 p-4 rounded-xl border-2 text-xs sm:text-sm leading-relaxed ${
                        sec.callout.type === 'warning'
                          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                          : sec.callout.type === 'tip'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                          : sec.callout.type === 'theorem'
                          ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-400 dark:border-purple-700 text-purple-950 dark:text-purple-100'
                          : 'bg-blue-50 dark:bg-blue-950/50 border-blue-400 dark:border-blue-700 text-blue-950 dark:text-blue-100'
                      }`}>
                        <div className="font-extrabold mb-1 flex items-center gap-1.5 font-mono">
                          <span>{sec.callout.type.toUpperCase()}:</span>
                          <span>{sec.callout.title}</span>
                        </div>
                        <p className="font-medium">{sec.callout.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Rich Interactive Engineering Diagrams & Schematics */}
      {engineeringDiagrams.length > 0 && (
        <section id="diagram" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-blue-100 dark:border-slate-800 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                Hardware Circuit Schematics & Waveforms
              </h2>
            </div>
            {engineeringDiagrams.length > 1 && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold self-start sm:self-auto">
                {engineeringDiagrams.length} Schematics Available
              </span>
            )}
          </div>

          {engineeringDiagrams.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-1 pb-1">
              {engineeringDiagrams.map((diag, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDiagramIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeDiagramIndex === idx
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeDiagramIndex === idx ? 'bg-white' : 'bg-blue-500'}`} />
                  <span>Schematic {idx + 1}: {diag.title.length > 36 ? diag.title.slice(0, 36) + '...' : diag.title}</span>
                </button>
              ))}
            </div>
          )}

          {engineeringDiagrams[activeDiagramIndex] && (
            <EngineeringDiagram
              diagramId={engineeringDiagrams[activeDiagramIndex].id}
              title={engineeringDiagrams[activeDiagramIndex].title}
              caption={engineeringDiagrams[activeDiagramIndex].caption}
            />
          )}
        </section>
      )}

      {/* 6. Embedded Live Hardware Circuit Simulator (if interactive gate/latch) */}
      {circuitSimType && (
        <section id="simulator" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 dark:border-slate-800 pb-3">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Live Hardware Circuit Simulation Sandbox
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Click the input toggles to propagate digital signals through logic gates and observe the output state in real-time.
          </p>
          <CircuitDiagram
            type={circuitSimType}
            title={`Real-Time ${circuitSimType} Logic Simulation`}
          />
        </section>
      )}

      {/* 7. Truth Table Component */}
      {topic.truthTable && (
        <section id="truthtable" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 dark:border-slate-800 pb-3">
            <List className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Standard Truth Table & State Mapping
            </h2>
          </div>
          <TruthTable
            headers={topic.truthTable.headers}
            rows={topic.truthTable.rows}
            notes={topic.truthTable.notes}
          />
        </section>
      )}

      {/* 8. Mathematical Derivations & Step-by-Step Proofs */}
      {topic.mathematicalExplanation && (
        <section id="math" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 dark:border-slate-800 pb-3">
            <PenTool className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Governing Mathematical Formulations & Derivations
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white shadow-md space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block font-mono">
              Core Boolean & Physical Equations
            </span>
            <div className="space-y-3 font-mono text-sm sm:text-base text-blue-300">
              {topic.mathematicalExplanation.equations.map((eq, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
                  <code>{eq}</code>
                </div>
              ))}
            </div>

            {topic.mathematicalExplanation.derivationSteps && (
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">
                  Formal Derivation Steps & Proof
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside leading-relaxed font-sans">
                  {topic.mathematicalExplanation.derivationSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. Solved Step-by-Step Classroom Problems */}
      {topic.solvedProblems && topic.solvedProblems.length > 0 && (
        <section id="problems" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 dark:border-slate-800 pb-3">
            <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Step-by-Step Solved Classroom Problems
            </h2>
          </div>

          <div className="space-y-4">
            {topic.solvedProblems.map((prob, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                    PROBLEM #{idx + 1} · UNIVERSITY STANDARD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Classroom Walkthrough</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans leading-snug">
                  {prob.question}
                </h3>

                <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs sm:text-sm text-emerald-300 whitespace-pre-line border border-slate-800">
                  {prob.solution}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <strong>Engineering Reasoning:</strong> {prob.explanation}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Professor's Blackboard Chalkboard Notes */}
      <section id="blackboard" className="rounded-2xl border-2 border-amber-400/50 bg-slate-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl text-amber-300 pointer-events-none">
          CHALKBOARD
        </div>

        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <PenTool className="h-5 w-5" />
          <h2 className="text-xl font-bold font-display tracking-wide uppercase">
            Professor's Blackboard Summary & Exam Notes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 block">
              1. Must-Remember Blackboard Rules:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-mono list-disc list-inside leading-relaxed">
              {topic.examPoints.map((ep, i) => (
                <li key={i}>{ep}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block">
              2. Examiner Traps & Common Mistakes:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-200 font-sans list-disc list-inside leading-relaxed">
              {topic.commonMistakes.map((cm, i) => (
                <li key={i}>{cm}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-amber-200/90 font-mono flex items-center justify-between">
          <span>💡 Professor's Tip: Review these points before stepping into university finals or technical interviews.</span>
          <span className="hidden sm:inline text-slate-400">DigiLearn EE Lecture</span>
        </div>
      </section>

      {/* 11. Interactive Classroom Knowledge Check / Quiz */}
      <section id="quiz" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-100 dark:border-slate-800 pb-3">
          <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            Interactive Classroom Knowledge Check
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Verify your comprehension of this lecture with immediate feedback, hints, and professor explanations.
        </p>

        <div className="space-y-6">
          {activeChecks.map((quiz, qIdx) => {
            const selectedOpt = activeQuizAnswers[qIdx];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === quiz.correctIndex;

            return (
              <div
                key={qIdx}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    QUESTION {qIdx + 1} OF {activeChecks.length}
                  </span>
                  <button
                    onClick={() => toggleHint(qIdx)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>{showQuizHint[qIdx] ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                </div>

                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {quiz.question}
                </div>

                {showQuizHint[qIdx] && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                    <strong>Hint:</strong> {quiz.hint}
                  </div>
                )}

                <div className="space-y-3">
                  {quiz.options.map((opt, optIdx) => {
                    let btnClass = 'border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:border-blue-600 hover:shadow-sm font-bold';
                    let badgeClass = 'border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-black';

                    if (isAnswered) {
                      if (optIdx === quiz.correctIndex) {
                        btnClass = 'border-2 border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100 font-black shadow-sm ring-2 ring-emerald-500/20';
                        badgeClass = 'bg-emerald-600 text-white border-emerald-700 font-black';
                      } else if (optIdx === selectedOpt && !isCorrect) {
                        btnClass = 'border-2 border-rose-600 bg-rose-100 text-rose-950 dark:bg-rose-950 dark:text-rose-100 font-black line-through';
                        badgeClass = 'bg-rose-600 text-white border-rose-700 font-black';
                      } else {
                        btnClass = 'opacity-60 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs shrink-0 ${badgeClass}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                        {isAnswered && optIdx === quiz.correctIndex && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                        )}
                        {isAnswered && optIdx === selectedOpt && !isCorrect && (
                          <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className={`p-5 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed shadow-xs space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                      : 'bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-500 text-rose-950 dark:text-rose-100'
                  }`}>
                    <div className="font-black text-sm flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                          <span>✓ Correct Answer! Well done!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-rose-700 dark:text-rose-400" />
                          <span>✗ Not Quite Correct. Review the lecture concept below:</span>
                        </>
                      )}
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 leading-relaxed pt-1">
                      {quiz.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. Real-World Applications, Advantages & Limitations */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-3 font-mono">
            Industry Applications
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside font-medium leading-relaxed">
            {topic.applications.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-3 font-mono">
            Key Engineering Advantages
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside font-medium leading-relaxed">
            {topic.advantages.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-3 font-mono">
            Physical Limitations & Constraints
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside font-medium leading-relaxed">
            {topic.limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 13. University & GATE Viva Voce Questions */}
      <section id="viva" className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1 font-mono">
            Oral Viva Voce & GATE Preparation
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
            Examiner Viva Voce & Technical Interview Questions
          </h2>
        </div>

        <div className="space-y-4">
          {topic.vivaQuestions.map((vq, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
              <div className="font-extrabold text-slate-950 dark:text-white flex items-start gap-2">
                <span className="text-blue-700 dark:text-blue-400 font-mono font-black">Q{i + 1}:</span>
                <span>{vq.question}</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200 pl-6 leading-relaxed font-medium">
                <strong className="text-slate-950 dark:text-white font-bold">Answer:</strong> {vq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. Bottom Previous / Next Lecture Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-slate-200 dark:border-slate-800">
        {prevTopic ? (
          <button
            onClick={() => onNavigateTopic(prevTopic.slug)}
            className="flex flex-col items-start p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 hover:border-blue-600 bg-white dark:bg-slate-900 transition-all text-left shadow-xs cursor-pointer group"
          >
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1 mb-1 font-mono">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" /> Previous Lecture
            </span>
            <span className="text-sm font-extrabold text-slate-950 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {prevTopic.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <button
            onClick={() => onNavigateTopic(nextTopic.slug)}
            className="flex flex-col items-end p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 hover:border-blue-600 bg-white dark:bg-slate-900 transition-all text-right shadow-xs cursor-pointer group"
          >
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1 mb-1 font-mono">
              Next Lecture <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-sm font-extrabold text-slate-950 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {nextTopic.title}
            </span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
