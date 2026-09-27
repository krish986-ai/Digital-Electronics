import React from 'react';
import { KMapResult } from '../lib/kmapSolver';

interface KMapVisualizerProps {
  result: KMapResult;
  onCellClick: (mintermIndex: number) => void;
}

export const KMapVisualizer: React.FC<KMapVisualizerProps> = ({
  result,
  onCellClick,
}) => {
  const { variables, grid, groups, minimizedSOP, steps } = result;

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white font-display">
            {variables.length}-Variable Karnaugh Map
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Variables: {variables.join(', ')} · Gray code ordered toroid grid
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Legend:</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Active 1
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Inactive 0
          </span>
        </div>
      </div>

      {/* The 2D Karnaugh Map Matrix */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full">
          <div className="flex items-start">
            {/* Top-left corner axis header */}
            <div className="w-24 sm:w-28 text-center text-xs font-mono font-semibold text-slate-400 pt-6 pr-2">
              {variables.length === 2
                ? 'A \\ B'
                : variables.length === 3
                ? 'A \\ BC'
                : 'AB \\ CD'}
            </div>

            {/* Column Gray Code Labels */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${grid.colLabels.length}, minmax(64px, 1fr))` }}>
              {grid.colLabels.map((col, idx) => (
                <div key={idx} className="text-center font-mono text-xs font-semibold text-slate-600 dark:text-slate-300 pb-2 px-1">
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Grid Rows */}
          {grid.cellMatrix.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center">
              {/* Row Gray Code Label */}
              <div className="w-24 sm:w-28 text-right font-mono text-xs font-semibold text-slate-600 dark:text-slate-300 pr-4 py-3">
                {grid.rowLabels[rIdx]}
              </div>

              {/* Row Cells */}
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${grid.colLabels.length}, minmax(64px, 1fr))` }}
              >
                {row.map((cell) => {
                  const isOne = cell.value === 1;
                  const isX = cell.value === 'X';
                  const hasGroup = cell.groups.length > 0;
                  const primaryGroup = groups.find((g) => cell.groups.includes(g.id));

                  return (
                    <button
                      key={cell.mintermIndex}
                      onClick={() => onCellClick(cell.mintermIndex)}
                      className={`relative flex flex-col items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-xl border-2 transition-all cursor-pointer ${
                        primaryGroup
                          ? primaryGroup.color
                          : isOne
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                          : isX
                          ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:border-slate-300'
                      }`}
                      title={`Cell m${cell.mintermIndex} — Click to toggle (0 -> 1 -> X -> 0)`}
                    >
                      <span className="text-lg font-bold font-mono">
                        {cell.value}
                      </span>
                      <span className="absolute bottom-1 right-2 text-[10px] font-mono text-slate-400/80">
                        m{cell.mintermIndex}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Output Expression */}
      <div className="mt-6 rounded-xl bg-slate-900 dark:bg-slate-950 p-4 font-mono text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
        <div>
          <span className="text-[11px] text-slate-400 block font-sans uppercase tracking-wider">
            Minimized Sum-of-Products (SOP)
          </span>
          <span className="text-lg font-bold text-emerald-400">
            F = {minimizedSOP}
          </span>
        </div>
        <div className="text-xs text-slate-400 font-sans">
          {groups.length} prime implicant{groups.length !== 1 ? 's' : ''} formed
        </div>
      </div>

      {/* Grouping Breakdown & Steps */}
      {groups.length > 0 && (
        <div className="mt-5 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Prime Implicant Groups
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {groups.map((grp) => (
              <div
                key={grp.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 p-2.5 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full border ${grp.color}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {grp.term}
                  </span>
                </div>
                <span className="text-slate-500 text-[11px]">
                  Cells: [{grp.cells.join(', ')}]
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deduction Steps */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Step-by-Step Derivation
        </span>
        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {steps.map((st, idx) => (
            <li key={idx} className="leading-relaxed">
              {st}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
