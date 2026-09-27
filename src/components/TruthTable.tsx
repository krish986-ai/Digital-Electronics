import React from 'react';

interface TruthTableProps {
  headers: string[];
  rows: (string | number)[][];
  highlightRowIndex?: number;
  notes?: string;
}

export const TruthTable: React.FC<TruthTableProps> = ({
  headers,
  rows,
  highlightRowIndex,
  notes,
}) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <div className="border-b border-slate-100 dark:border-slate-800 px-4 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Truth Table
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          {rows.length} combinations ({Math.log2(rows.length) >= 1 ? `${Math.round(Math.log2(rows.length))} inputs` : ''})
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 font-semibold text-center first:text-left last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {rows.map((row, rIdx) => {
              const isHighlighted = highlightRowIndex === rIdx;
              return (
                <tr
                  key={rIdx}
                  className={`transition-colors ${
                    isHighlighted
                      ? 'bg-blue-50 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-200'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2 text-center first:text-left last:text-right">
                      <span className={cell === 1 || cell === '1' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}>
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {notes && (
        <div className="border-t border-slate-100 dark:border-slate-800/60 px-4 py-2 bg-slate-50/30 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 italic">
          Note: {notes}
        </div>
      )}
    </div>
  );
};
