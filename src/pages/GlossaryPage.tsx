import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { GLOSSARY } from '../content/glossary';

export const GlossaryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  const alphabet = ['All', ...Array.from(new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))).sort()];

  const filtered = GLOSSARY.filter((item) => {
    const matchesLetter = selectedLetter === 'All' || item.term.toUpperCase().startsWith(selectedLetter);
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleDef.toLowerCase().includes(search.toLowerCase()) ||
      item.technicalDef.toLowerCase().includes(search.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header - High Contrast Academic Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
          Digital Electronics Dictionary
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Technical Terms & Lexicon
        </h1>
        <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
          Clear, dual-level definitions (simple everyday concepts vs rigorous semiconductor physics definitions) for key terminology used in research, exams, and industry.
        </p>
      </div>

      {/* Search and Alphabet Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search glossary terms (e.g. Setup Time, Fan-Out, Metastability)..."
            className="w-full rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`h-8 min-w-[32px] px-2 text-xs font-mono font-medium rounded-xl transition-all cursor-pointer ${
                selectedLetter === letter
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-3">
                {item.term}
              </h3>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5">
                    Intuitive Meaning:
                  </span>
                  {item.simpleDef}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5 font-mono">
                    Technical Definition:
                  </span>
                  {item.technicalDef}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="italic line-clamp-1">Example: {item.example}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
