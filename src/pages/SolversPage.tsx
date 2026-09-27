import React, { useState, useMemo } from 'react';
import { solveKMap } from '../lib/kmapSolver';
import { analyzeBooleanExpression } from '../lib/booleanEvaluator';
import { convertFromDecimal, convertFromBinary, computeComplements, binaryToGray, grayToBinary, decimalToBCD } from '../lib/numberSystems';
import { calculateDAC, calculateADC, calculate555Timer, calculateClockTiming } from '../lib/engineeringCalcs';
import { KMapVisualizer } from '../components/KMapVisualizer';
import { TruthTable } from '../components/TruthTable';

export const SolversPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'kmap' | 'boolean' | 'numbers' | 'engineering'>('kmap');

  // --- K-MAP STATE ---
  const [kmapNumVars, setKmapNumVars] = useState<2 | 3 | 4>(3);
  const [kmapMintermsInput, setKmapMintermsInput] = useState<string>('0, 2, 5, 7');
  const [kmapDontCaresInput, setKmapDontCaresInput] = useState<string>('1');

  const parsedMinterms = useMemo(() => {
    return kmapMintermsInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 0 && n < Math.pow(2, kmapNumVars));
  }, [kmapMintermsInput, kmapNumVars]);

  const parsedDontCares = useMemo(() => {
    return kmapDontCaresInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 0 && n < Math.pow(2, kmapNumVars));
  }, [kmapDontCaresInput, kmapNumVars]);

  const kmapResult = useMemo(() => {
    return solveKMap(kmapNumVars, parsedMinterms, parsedDontCares);
  }, [kmapNumVars, parsedMinterms, parsedDontCares]);

  const handleKMapCellClick = (idx: number) => {
    const isM = parsedMinterms.includes(idx);
    const isD = parsedDontCares.includes(idx);

    if (isM) {
      // 1 -> X (don't care)
      const newM = parsedMinterms.filter((m) => m !== idx);
      const newD = [...parsedDontCares, idx];
      setKmapMintermsInput(newM.join(', '));
      setKmapDontCaresInput(newD.join(', '));
    } else if (isD) {
      // X -> 0 (none)
      const newD = parsedDontCares.filter((d) => d !== idx);
      setKmapDontCaresInput(newD.join(', '));
    } else {
      // 0 -> 1
      const newM = [...parsedMinterms, idx];
      setKmapMintermsInput(newM.join(', '));
    }
  };

  // --- BOOLEAN EVALUATOR STATE ---
  const [booleanInput, setBooleanInput] = useState("A'B + AB'");
  const booleanAnalysis = useMemo(() => {
    return analyzeBooleanExpression(booleanInput);
  }, [booleanInput]);

  // --- NUMBER SYSTEM STATE ---
  const [numInputDec, setNumInputDec] = useState('42');
  const [signedBitWidth, setSignedBitWidth] = useState<4 | 8 | 16>(8);
  const baseConvResult = useMemo(() => convertFromDecimal(numInputDec), [numInputDec]);
  const complementResult = useMemo(
    () => computeComplements(parseInt(numInputDec, 10) || 0, signedBitWidth),
    [numInputDec, signedBitWidth]
  );

  // --- ENGINEERING CALCULATORS STATE ---
  const [dacBits, setDacBits] = useState(8);
  const [dacVref, setDacVref] = useState(5.0);
  const [dacInputDec, setDacInputDec] = useState(128);
  const dacResult = useMemo(() => calculateDAC(dacBits, dacVref, dacInputDec), [dacBits, dacVref, dacInputDec]);

  const [adcBits, setAdcBits] = useState(10);
  const [adcVfs, setAdcVfs] = useState(5.0);
  const [adcAnalogIn, setAdcAnalogIn] = useState(2.35);
  const adcResult = useMemo(() => calculateADC(adcBits, adcVfs, adcAnalogIn), [adcBits, adcVfs, adcAnalogIn]);

  const [timerR1, setTimerR1] = useState(10000); // 10k
  const [timerR2, setTimerR2] = useState(47000); // 47k
  const [timerC, setTimerC] = useState(0.0000001); // 100nF
  const timerResult = useMemo(() => calculate555Timer(timerR1, timerR2, timerC), [timerR1, timerR2, timerC]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title - High Contrast Academic Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
          Digital Engineering Suite
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Interactive Solvers & Calculators
        </h1>
        <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
          Verify homework, synthesize minimal Boolean formulas with automated K-Maps, convert number systems, and compute mixed-signal ADC/DAC resolutions.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b-2 border-slate-200 dark:border-slate-800 no-scrollbar">
        {[
          { id: 'kmap', label: 'K-Map Solver (2, 3, 4 Vars)' },
          { id: 'boolean', label: 'Boolean Expression Evaluator' },
          { id: 'numbers', label: 'Radix & 2’s Complement' },
          { id: 'engineering', label: 'Mixed-Signal & Clock Calcs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTool(tab.id as any)}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl whitespace-nowrap border-2 transition-all cursor-pointer ${
              activeTool === tab.id
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-800 hover:border-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. K-MAP SOLVER */}
      {activeTool === 'kmap' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
              Karnaugh Map Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Number of Variables
                </label>
                <div className="flex gap-2">
                  {([2, 3, 4] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setKmapNumVars(num)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                        kmapNumVars === num
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {num} Vars ({Math.pow(2, num)} cells)
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Minterms Σm (Comma-separated)
                </label>
                <input
                  type="text"
                  value={kmapMintermsInput}
                  onChange={(e) => setKmapMintermsInput(e.target.value)}
                  placeholder="e.g. 0, 2, 5, 7"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Don't Cares d (Optional)
                </label>
                <input
                  type="text"
                  value={kmapDontCaresInput}
                  onChange={(e) => setKmapDontCaresInput(e.target.value)}
                  placeholder="e.g. 1, 3"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span>Quick Presets:</span>
              <button
                onClick={() => {
                  setKmapNumVars(3);
                  setKmapMintermsInput('1, 3, 5, 7');
                  setKmapDontCaresInput('');
                }}
                className="hover:text-blue-600 underline"
              >
                Odd 3-bit (C)
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setKmapNumVars(4);
                  setKmapMintermsInput('0, 2, 8, 10');
                  setKmapDontCaresInput('');
                }}
                className="hover:text-blue-600 underline"
              >
                4 Corners (B'D')
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setKmapNumVars(4);
                  setKmapMintermsInput('1, 3, 7, 11, 15');
                  setKmapDontCaresInput('0, 2, 5');
                }}
                className="hover:text-blue-600 underline"
              >
                With Don't Cares
              </button>
            </div>
          </div>

          {/* Visual K-Map Output */}
          <KMapVisualizer result={kmapResult} onCellClick={handleKMapCellClick} />
        </div>
      )}

      {/* 2. BOOLEAN EXPRESSION EVALUATOR */}
      {activeTool === 'boolean' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-3">
              Boolean Expression Analyzer & Truth Synthesizer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter any Boolean expression. Supports prime notation (A'), AND (* or & or adjacent), OR (+ or |), and XOR (^).
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={booleanInput}
                onChange={(e) => setBooleanInput(e.target.value)}
                placeholder="e.g. A'B + AB' or (A + B)(C + D')"
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-2">
                {["A'B + AB'", '(A + B)(A + C)', "AB + A'C + BC", "(A + B)'"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBooleanInput(preset)}
                    className="px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {booleanAnalysis.error && (
              <div className="mt-3 text-xs text-rose-500 font-medium">
                {booleanAnalysis.error}
              </div>
            )}
          </div>

          {booleanAnalysis.isValid && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Canonical Minterms & Maxterms */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Minterms & Maxterms
                    </span>
                    <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">Σm:</span>{' '}
                        [{booleanAnalysis.minterms.join(', ') || 'none'}]
                      </div>
                      <div className="mt-1">
                        <span className="font-bold text-purple-600 dark:text-purple-400">ΠM:</span>{' '}
                        [{booleanAnalysis.maxterms.join(', ') || 'none'}]
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Canonical Sum of Products (SOP)
                    </span>
                    <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                      <code>F = {booleanAnalysis.canonicalSOP}</code>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Canonical Product of Sums (POS)
                    </span>
                    <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-blue-400 overflow-x-auto">
                      <code>F = {booleanAnalysis.canonicalPOS}</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Truth Table */}
              <div className="lg:col-span-7">
                <TruthTable
                  headers={[
                    'Row',
                    ...booleanAnalysis.variables,
                    `F (${booleanInput})`,
                  ]}
                  rows={booleanAnalysis.truthTable.map((row) => [
                    `m${row.mintermIndex}`,
                    ...booleanAnalysis.variables.map((v) => row.inputs[v]),
                    row.output,
                  ])}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. RADIX & 2'S COMPLEMENT CONVERTER */}
      {activeTool === 'numbers' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-3">
              Multi-Base Radix & Signed 2's Complement Converter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Decimal Input (Supports negative and fractions, e.g. -42 or 109.625)
                </label>
                <input
                  type="text"
                  value={numInputDec}
                  onChange={(e) => setNumInputDec(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Signed Bit-Width
                </label>
                <div className="flex gap-2">
                  {([4, 8, 16] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setSignedBitWidth(w)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                        signedBitWidth === w
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {w}-Bit
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Binary (Base 2)
              </span>
              <span className="text-base font-bold font-mono text-blue-600 dark:text-blue-400 break-all">
                {baseConvResult.binary}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Octal (Base 8)
              </span>
              <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 break-all">
                {baseConvResult.octal}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Hexadecimal (Base 16)
              </span>
              <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 break-all">
                0x{baseConvResult.hexadecimal}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                BCD (8421 Code)
              </span>
              <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 break-all">
                {decimalToBCD(parseFloat(numInputDec) || 0)}
              </span>
            </div>
          </div>

          {/* Complements Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-3">
              {signedBitWidth}-Bit Signed Representation & Overflow Check
            </h3>

            {complementResult.isOutOfRange && (
              <div className="mb-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-3 text-xs text-rose-600 dark:text-rose-300 font-semibold">
                ⚠️ Overflow Warning: {complementResult.value} exceeds the {signedBitWidth}-bit signed range ({complementResult.minSigned} to +{complementResult.maxSigned}).
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                <span className="text-slate-400 block text-[10px] uppercase font-sans mb-1">
                  Unsigned Magnitude Binary
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {complementResult.rawBinary}
                </span>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                <span className="text-slate-400 block text-[10px] uppercase font-sans mb-1">
                  1's Complement (Bit Inversion)
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {complementResult.onesComplement}
                </span>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                <span className="text-slate-400 block text-[10px] uppercase font-sans mb-1">
                  2's Complement (1's Comp + 1)
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {complementResult.twosComplement}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ENGINEERING MIXED-SIGNAL & TIMING CALCULATORS */}
      {activeTool === 'engineering' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DAC Calculator */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              DAC (Digital-to-Analog) Output Calculator
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Resolution (Bits)</label>
                <input
                  type="number"
                  min="2"
                  max="16"
                  value={dacBits}
                  onChange={(e) => setDacBits(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">V_ref (Volts)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dacVref}
                  onChange={(e) => setDacVref(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Digital Code (Dec)</label>
                <input
                  type="number"
                  min="0"
                  max={Math.pow(2, dacBits) - 1}
                  value={dacInputDec}
                  onChange={(e) => setDacInputDec(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300 space-y-1.5 shadow-inner">
              <div className="flex justify-between">
                <span>Binary Word:</span>
                <span className="text-blue-400 font-bold">{dacResult.binaryCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Step Size (1 LSB):</span>
                <span>{(dacResult.stepSizeV * 1000).toFixed(2)} mV</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-400 pt-1 border-t border-slate-800">
                <span>Analog Output V_out:</span>
                <span>{dacResult.vOutV.toFixed(3)} Volts</span>
              </div>
            </div>
          </div>

          {/* ADC Calculator */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              ADC (Analog-to-Digital) Quantizer
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Resolution (Bits)</label>
                <input
                  type="number"
                  min="2"
                  max="16"
                  value={adcBits}
                  onChange={(e) => setAdcBits(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Full Scale V_FS (V)</label>
                <input
                  type="number"
                  step="0.5"
                  value={adcVfs}
                  onChange={(e) => setAdcVfs(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Analog Input V_in (V)</label>
                <input
                  type="number"
                  step="0.05"
                  value={adcAnalogIn}
                  onChange={(e) => setAdcAnalogIn(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono"
                />
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300 space-y-1.5 shadow-inner">
              <div className="flex justify-between">
                <span>Quantized Output Code:</span>
                <span className="text-purple-400 font-bold">{adcResult.binaryCode} ({adcResult.digitalCode})</span>
              </div>
              <div className="flex justify-between">
                <span>Quantization Error:</span>
                <span>{(adcResult.quantizationError * 1000).toFixed(2)} mV</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-amber-400 pt-1 border-t border-slate-800">
                <span>Theoretical SNR:</span>
                <span>{adcResult.snrDb.toFixed(2)} dB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
