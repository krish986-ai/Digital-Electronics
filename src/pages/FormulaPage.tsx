import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FORMULAS } from '../content/formulas';
import { FormulaBox } from '../components/FormulaBox';

export const FormulaPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = [
    'All',
    'Boolean Laws',
    'Arithmetic & Complement',
    'Timing & Clocks',
    'Counters',
    'ADC & DAC',
    'Logic Families',
  ];

  const filtered = FORMULAS.filter((f) => {
    const mCat = selectedCat === 'All' || f.category === selectedCat;
    const mSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.formula.toLowerCase().includes(search.toLowerCase()) ||
      f.meaning.toLowerCase().includes(search.toLowerCase());
    return mCat && mSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header - High Contrast Academic Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
          Engineering Reference Manual
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Digital Electronics Formula Handbook
        </h1>
        <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
          Quick-reference equations, Boolean axioms, ADC/DAC resolution steps, flip-flop excitation relations, and timing closure formulas with copy-to-clipboard support.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search formulas (e.g. De Morgan, V_out, f_max)..."
            className="w-full rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((formula) => (
          <FormulaBox key={formula.id} formula={formula} />
        ))}
      </div>
    </div>
  );
};
