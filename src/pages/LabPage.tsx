import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Cpu, Layers } from 'lucide-react';
import { CircuitDiagram, CircuitType } from '../components/CircuitDiagram';

export const LabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gates' | 'combinational' | 'sequential' | 'counters'>('gates');
  const [selectedGate, setSelectedGate] = useState<CircuitType>('AND');

  // Sequential Counter Simulation State
  const [counterBits, setCounterBits] = useState(3);
  const [counterVal, setCounterVal] = useState(0);
  const [isAutoClockRunning, setIsAutoClockRunning] = useState(false);
  const [clockSpeedHz, setClockSpeedHz] = useState(1);

  // Counter Auto-Clock Timer
  useEffect(() => {
    let interval: any = null;
    if (isAutoClockRunning) {
      interval = setInterval(() => {
        setCounterVal((prev) => (prev + 1) % Math.pow(2, counterBits));
      }, 1000 / clockSpeedHz);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoClockRunning, clockSpeedHz, counterBits]);

  const handleManualClock = () => {
    setCounterVal((prev) => (prev + 1) % Math.pow(2, counterBits));
  };

  const handleResetCounter = () => {
    setCounterVal(0);
  };

  const binaryString = counterVal.toString(2).padStart(counterBits, '0');

  const gateInfo: Record<string, { label: string; dot: string; activeClass: string }> = {
    AND: { label: 'AND Gate', dot: 'bg-blue-600', activeClass: 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
    OR: { label: 'OR Gate', dot: 'bg-amber-600', activeClass: 'border-amber-600 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
    NOT: { label: 'NOT Inverter', dot: 'bg-rose-600', activeClass: 'border-rose-600 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' },
    NAND: { label: 'NAND (Universal)', dot: 'bg-violet-600', activeClass: 'border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300' },
    NOR: { label: 'NOR (Universal)', dot: 'bg-cyan-600', activeClass: 'border-cyan-600 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300' },
    XOR: { label: 'XOR (Modulo-2)', dot: 'bg-emerald-600', activeClass: 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' },
    XNOR: { label: 'XNOR (Equiv)', dot: 'bg-pink-600', activeClass: 'border-pink-600 bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300' },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title - High Contrast Academic Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
          Digital Electronics Laboratory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Interactive Circuit Simulation Sandbox
        </h1>
        <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
          Experiment with real-time logic gates, arithmetic adders, sequential flip-flops, and binary ripple counters. Toggle signal lines and observe instantaneous logic propagation.
        </p>
      </div>

      {/* Lab Module Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b-2 border-slate-200 dark:border-slate-800 no-scrollbar">
        {[
          { id: 'gates', label: 'Logic Gates Catalog' },
          { id: 'combinational', label: 'Arithmetic & Combinational' },
          { id: 'sequential', label: 'Flip-Flops & Latches' },
          { id: 'counters', label: 'Synchronous / Ripple Counter' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl whitespace-nowrap border-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-800 hover:border-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Logic Gates Tab */}
      {activeTab === 'gates' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as CircuitType[]).map((gate) => {
              const info = gateInfo[gate] || { label: `${gate} Gate`, dot: 'bg-blue-600', activeClass: 'border-blue-600 bg-blue-100 text-blue-950' };
              const isSel = selectedGate === gate;
              return (
                <button
                  key={gate}
                  onClick={() => setSelectedGate(gate)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl border-2 transition-all cursor-pointer shadow-xs ${
                    isSel
                      ? `${info.activeClass} font-black shadow-xs scale-105`
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-blue-500'
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${info.dot}`} />
                  <span>{info.label}</span>
                </button>
              );
            })}
          </div>

          <CircuitDiagram
            type={selectedGate}
            title={`${selectedGate} Logic Gate Schematic & Truth Verification`}
          />
        </div>
      )}

      {/* 2. Combinational Tab */}
      {activeTab === 'combinational' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGate('HALF_ADDER')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors ${
                selectedGate === 'HALF_ADDER'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              1-Bit Half Adder
            </button>
            <button
              onClick={() => setSelectedGate('FULL_ADDER')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors ${
                selectedGate === 'FULL_ADDER'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              1-Bit Full Adder
            </button>
          </div>

          <CircuitDiagram
            type={selectedGate === 'HALF_ADDER' ? 'HALF_ADDER' : 'FULL_ADDER'}
            title={`Arithmetic Circuit: ${selectedGate === 'HALF_ADDER' ? 'Half Adder' : 'Full Adder'}`}
          />
        </div>
      )}

      {/* 3. Sequential Tab */}
      {activeTab === 'sequential' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGate('SR_LATCH')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors ${
                selectedGate === 'SR_LATCH'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              SR Latch (Bistable)
            </button>
            <button
              onClick={() => setSelectedGate('D_FLIP_FLOP')}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors ${
                selectedGate === 'D_FLIP_FLOP'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              D Flip-Flop (Edge-Triggered)
            </button>
          </div>

          <CircuitDiagram
            type={selectedGate === 'SR_LATCH' ? 'SR_LATCH' : 'D_FLIP_FLOP'}
            title={`Sequential Memory Cell: ${selectedGate === 'SR_LATCH' ? 'SR Latch' : 'D Flip-Flop'}`}
          />
        </div>
      )}

      {/* 4. Counter Simulator Tab */}
      {activeTab === 'counters' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Binary Ripple / Synchronous Counter Simulator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Visualizing multi-stage flip-flop state transitions and frequency division.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Bits:</span>
              {[2, 3, 4].map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setCounterBits(b);
                    setCounterVal(0);
                  }}
                  className={`h-7 w-7 text-xs font-mono font-bold rounded-lg border transition-colors ${
                    counterBits === b
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Counter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Control buttons */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoClockRunning(!isAutoClockRunning)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors ${
                    isAutoClockRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isAutoClockRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isAutoClockRunning ? 'Pause Clock Generator' : 'Run Auto Clock'}</span>
                </button>

                <button
                  onClick={handleManualClock}
                  disabled={isAutoClockRunning}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  Step Clock ↑
                </button>

                <button
                  onClick={handleResetCounter}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Reset Counter to 000"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  <span>Clock Frequency: {clockSpeedHz} Hz</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={clockSpeedHz}
                  onChange={(e) => setClockSpeedHz(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3.5 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Modulo {Math.pow(2, counterBits)} (MOD-{Math.pow(2, counterBits)}):
                </span>
                Counts cyclically through {Math.pow(2, counterBits)} unique binary states (0 to {Math.pow(2, counterBits) - 1}) then wraps back to 0.
              </div>
            </div>

            {/* Visual LED & State Monitor */}
            <div className="md:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-inner">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">
                Active Register Outputs (Q_{counterBits - 1} ... Q_0)
              </span>

              {/* Physical LED row */}
              <div className="flex items-center gap-4 sm:gap-6 mb-6">
                {binaryString.split('').map((bit, idx) => {
                  const bitIndex = counterBits - 1 - idx;
                  const isHigh = bit === '1';

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                          isHigh
                            ? 'border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                            : 'border-slate-700 bg-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-2xl font-bold font-mono">{bit}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Q{bitIndex} {bitIndex === 0 ? '(LSB)' : bitIndex === counterBits - 1 ? '(MSB)' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Decimal & Hex Readout */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-800 w-full justify-center text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Decimal Count</span>
                  <span className="text-lg font-bold text-emerald-400">{counterVal}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Hexadecimal</span>
                  <span className="text-lg font-bold text-purple-400">0x{counterVal.toString(16).toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Frequency Div</span>
                  <span className="text-lg font-bold text-amber-400">f / {Math.pow(2, counterBits)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
