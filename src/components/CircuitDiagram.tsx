import React, { useState } from 'react';

export type CircuitType =
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'NAND'
  | 'NOR'
  | 'XOR'
  | 'XNOR'
  | 'HALF_ADDER'
  | 'FULL_ADDER'
  | 'SR_LATCH'
  | 'D_FLIP_FLOP';

interface CircuitDiagramProps {
  type: CircuitType;
  title?: string;
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ type, title }) => {
  const [inA, setInA] = useState<0 | 1>(0);
  const [inB, setInB] = useState<0 | 1>(1);
  const [inCin, setInCin] = useState<0 | 1>(0);
  const [clk, setClk] = useState<0 | 1>(0);
  const [qState, setQState] = useState<0 | 1>(0);

  // Compute outputs dynamically
  let out1 = 0;
  let out2: number | null = null;
  let outLabel1 = 'Y';
  let outLabel2 = '';

  switch (type) {
    case 'AND':
      out1 = inA & inB;
      break;
    case 'OR':
      out1 = inA | inB;
      break;
    case 'NOT':
      out1 = inA === 0 ? 1 : 0;
      break;
    case 'NAND':
      out1 = (inA & inB) === 1 ? 0 : 1;
      break;
    case 'NOR':
      out1 = (inA | inB) === 1 ? 0 : 1;
      break;
    case 'XOR':
      out1 = inA ^ inB;
      break;
    case 'XNOR':
      out1 = inA === inB ? 1 : 0;
      break;
    case 'HALF_ADDER':
      out1 = inA ^ inB; // Sum
      out2 = inA & inB; // Carry
      outLabel1 = 'Sum (S)';
      outLabel2 = 'Carry (C)';
      break;
    case 'FULL_ADDER':
      out1 = inA ^ inB ^ inCin; // Sum
      out2 = (inA & inB) | (inCin & (inA ^ inB)); // Cout
      outLabel1 = 'Sum (S)';
      outLabel2 = 'C_out';
      break;
    case 'SR_LATCH':
      // inA = S, inB = R
      if (inA === 1 && inB === 0) out1 = 1;
      else if (inA === 0 && inB === 1) out1 = 0;
      else if (inA === 1 && inB === 1) out1 = 0; // Invalid
      else out1 = qState; // Hold
      outLabel1 = inA === 1 && inB === 1 ? 'INVALID (0)' : `Q (${out1})`;
      break;
    case 'D_FLIP_FLOP':
      out1 = qState;
      outLabel1 = `Q (${out1})`;
      break;
  }

  const handleClockPulse = () => {
    setClk(1);
    setTimeout(() => setClk(0), 180);
    if (type === 'D_FLIP_FLOP') {
      setQState(inA);
    }
  };

  const getWireColor = (val: number | boolean) =>
    val === 1 || val === true
      ? 'stroke-blue-600 dark:stroke-cyan-400'
      : 'stroke-slate-300 dark:stroke-slate-700';

  const getSignalBadge = (val: number | boolean) =>
    val === 1 || val === true
      ? 'bg-blue-600 text-white font-bold shadow-xs'
      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium';

  const getOutputBadge = (val: number | boolean) =>
    val === 1 || val === true
      ? 'bg-emerald-600 text-white font-bold shadow-xs shadow-emerald-500/30 animate-pulse'
      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium';

  return (
    <div className="my-6 rounded-2xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between border-b border-blue-50 dark:border-slate-800 px-5 py-3 bg-blue-50/40 dark:bg-slate-850/60">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
          {title || `Interactive ${type} Logic Schematic`}
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Click input toggles to simulate in real-time
        </span>
      </div>

      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Input Toggle Panel */}
        <div className="flex flex-col gap-3 min-w-[140px]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Signal Inputs
          </span>

          <button
            onClick={() => setInA(inA === 1 ? 0 : 1)}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 dark:border-slate-700 px-3 py-2 text-xs font-mono font-medium hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <span className="font-semibold text-slate-700 dark:text-slate-300">{type === 'SR_LATCH' ? 'Set (S)' : type === 'D_FLIP_FLOP' ? 'Data (D)' : 'Input A'}</span>
            <span className={`h-5 w-6 rounded-md flex items-center justify-center font-bold text-xs ${getSignalBadge(inA)}`}>
              {inA}
            </span>
          </button>

          {type !== 'NOT' && type !== 'D_FLIP_FLOP' && (
            <button
              onClick={() => setInB(inB === 1 ? 0 : 1)}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 dark:border-slate-700 px-3 py-2 text-xs font-mono font-medium hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">{type === 'SR_LATCH' ? 'Reset (R)' : 'Input B'}</span>
              <span className={`h-5 w-6 rounded-md flex items-center justify-center font-bold text-xs ${getSignalBadge(inB)}`}>
                {inB}
              </span>
            </button>
          )}

          {type === 'FULL_ADDER' && (
            <button
              onClick={() => setInCin(inCin === 1 ? 0 : 1)}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 dark:border-slate-700 px-3 py-2 text-xs font-mono font-medium hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">Carry In</span>
              <span className={`h-5 w-6 rounded-md flex items-center justify-center font-bold text-xs ${getSignalBadge(inCin)}`}>
                {inCin}
              </span>
            </button>
          )}

          {type === 'D_FLIP_FLOP' && (
            <button
              onClick={handleClockPulse}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-mono font-semibold transition-all cursor-pointer shadow-2xs ${
                clk === 1
                  ? 'bg-amber-500 text-white scale-95 shadow-amber-500/40'
                  : 'bg-slate-900 text-white hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600'
              }`}
            >
              <span>Clock Pulse ↑</span>
            </button>
          )}
        </div>

        {/* Center SVG Circuit Canvas */}
        <div className="flex-1 flex items-center justify-center py-2">
          <svg viewBox="0 0 280 140" className="w-full max-w-[340px] h-36">
            {/* Input wires */}
            <line x1="20" y1="45" x2="90" y2="45" strokeWidth="3" className={getWireColor(inA)} />
            <text x="25" y="38" className="fill-slate-400 text-[10px] font-mono">
              {type === 'SR_LATCH' ? 'S' : type === 'D_FLIP_FLOP' ? 'D' : 'A'}
            </text>

            {type !== 'NOT' && type !== 'D_FLIP_FLOP' && (
              <>
                <line x1="20" y1="95" x2="90" y2="95" strokeWidth="3" className={getWireColor(inB)} />
                <text x="25" y="88" className="fill-slate-400 text-[10px] font-mono">
                  {type === 'SR_LATCH' ? 'R' : 'B'}
                </text>
              </>
            )}

            {type === 'D_FLIP_FLOP' && (
              <>
                <line x1="20" y1="95" x2="90" y2="95" strokeWidth="3" className={getWireColor(clk)} />
                <path d="M 85 90 L 95 95 L 85 100" fill="none" strokeWidth="2" className={getWireColor(clk)} />
                <text x="25" y="88" className="fill-slate-400 text-[10px] font-mono">
                  CLK
                </text>
              </>
            )}

            {/* Standard Logic Gate Shapes */}
            {(type === 'AND' || type === 'NAND') && (
              <path
                d="M 90 30 L 130 30 A 40 40 0 0 1 130 110 L 90 110 Z"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
                strokeWidth="2.5"
              />
            )}

            {(type === 'OR' || type === 'NOR') && (
              <path
                d="M 85 30 Q 115 70 85 110 Q 145 110 170 70 Q 145 30 85 30 Z"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
                strokeWidth="2.5"
              />
            )}

            {(type === 'XOR' || type === 'XNOR') && (
              <>
                <path
                  d="M 75 30 Q 105 70 75 110"
                  fill="none"
                  className="stroke-slate-700 dark:stroke-slate-300"
                  strokeWidth="2.5"
                />
                <path
                  d="M 85 30 Q 115 70 85 110 Q 145 110 170 70 Q 145 30 85 30 Z"
                  className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
                  strokeWidth="2.5"
                />
              </>
            )}

            {type === 'NOT' && (
              <polygon
                points="90,30 150,70 90,110"
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
                strokeWidth="2.5"
              />
            )}

            {(type === 'HALF_ADDER' || type === 'FULL_ADDER' || type === 'SR_LATCH' || type === 'D_FLIP_FLOP') && (
              <g>
                <rect
                  x="90"
                  y="25"
                  width="100"
                  height="90"
                  rx="6"
                  className="fill-slate-100 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
                  strokeWidth="2.5"
                />
                <text
                  x="140"
                  y="74"
                  textAnchor="middle"
                  className="fill-slate-700 dark:fill-slate-200 text-xs font-bold font-display"
                >
                  {type === 'HALF_ADDER' ? 'HALF ADDER' : type === 'FULL_ADDER' ? 'FULL ADDER' : type === 'SR_LATCH' ? 'SR LATCH' : 'D FLIP-FLOP'}
                </text>
              </g>
            )}

            {/* Inversion Bubbles for NAND, NOR, XNOR, NOT */}
            {(type === 'NAND' || type === 'NOT') && (
              <circle
                cx={type === 'NOT' ? '156' : '176'}
                cy="70"
                r="6"
                className="fill-white dark:fill-slate-900 stroke-slate-700 dark:stroke-slate-300"
                strokeWidth="2"
              />
            )}
            {(type === 'NOR' || type === 'XNOR') && (
              <circle
                cx="176"
                cy="70"
                r="6"
                className="fill-white dark:fill-slate-900 stroke-slate-700 dark:stroke-slate-300"
                strokeWidth="2"
              />
            )}

            {/* Output lines */}
            <line
              x1={
                type === 'NOT'
                  ? '162'
                  : type === 'NAND' || type === 'NOR' || type === 'XNOR'
                  ? '182'
                  : type === 'HALF_ADDER' || type === 'FULL_ADDER' || type === 'SR_LATCH' || type === 'D_FLIP_FLOP'
                  ? '190'
                  : '170'
              }
              y1={type === 'HALF_ADDER' || type === 'FULL_ADDER' ? '50' : '70'}
              x2="245"
              y2={type === 'HALF_ADDER' || type === 'FULL_ADDER' ? '50' : '70'}
              strokeWidth="3"
              className={getWireColor(out1)}
            />

            {out2 !== null && (
              <line
                x1="190"
                y1="90"
                x2="245"
                y2="90"
                strokeWidth="3"
                className={getWireColor(out2)}
              />
            )}
          </svg>
        </div>

        {/* Output Indicator Panel */}
        <div className="flex flex-col gap-3 min-w-[140px]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Output State
          </span>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 font-mono text-xs shadow-2xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{outLabel1}</span>
            <span className={`h-5 w-6 rounded-md flex items-center justify-center font-bold text-xs ${getOutputBadge(out1)}`}>
              {out1}
            </span>
          </div>

          {out2 !== null && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 font-mono text-xs shadow-2xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{outLabel2}</span>
              <span className={`h-5 w-6 rounded-md flex items-center justify-center font-bold text-xs ${getOutputBadge(out2)}`}>
                {out2}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
