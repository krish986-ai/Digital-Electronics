import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { FormulaItem } from '../types';

interface FormulaBoxProps {
  formula: FormulaItem;
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({ formula }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula.formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryStyles: Record<string, string> = {
    'Boolean Laws': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    'Arithmetic & Complement': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    'Timing & Clocks': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'Counters': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    'ADC & DAC': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
    'Logic Families': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
  };

  const badgeClass = categoryStyles[formula.category] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider mb-1 ${badgeClass}`}>
            {formula.category}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            {formula.name}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs text-slate-600 hover:text-blue-600 hover:border-blue-300 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
          title="Copy formula to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="my-3 rounded-xl bg-slate-900 dark:bg-slate-950 p-3.5 font-mono text-sm text-blue-400 overflow-x-auto shadow-inner border border-slate-800">
        <code>{formula.formula}</code>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
        {formula.meaning}
      </p>

      {formula.variables && formula.variables.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
            Variables & Units
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            {formula.variables.map((v, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {v.symbol}:
                </span>
                <span>{v.meaning}</span>
                {v.unit && <span className="text-[11px] text-slate-400">({v.unit})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {formula.example && (
        <div className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 p-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
          <span className="text-slate-400 font-sans block text-[10px] uppercase font-semibold mb-0.5">
            Example
          </span>
          {formula.example}
        </div>
      )}
    </div>
  );
};
