import React, { useState } from 'react';
import { ExternalLink, BookOpen, Video, Wrench, ShieldCheck } from 'lucide-react';
import { RESOURCES } from '../content/resources';

export const ResourcesPage: React.FC = () => {
  const [filterCat, setFilterCat] = useState<string>('All');

  const categories = ['All', 'Open Course', 'Textbook', 'Simulation Tool', 'Reference Manual'];

  const filtered = RESOURCES.filter(
    (r) => filterCat === 'All' || r.category === filterCat
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header - High Contrast Academic Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
          Curated Academic Repository
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Free & Open-Access External Resources
        </h1>
        <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
          A verified collection of 100% free textbooks, open university courseware (MIT & IIT), browser-based circuit simulators, and official semiconductor manufacturer datasheets.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-blue-100 dark:border-slate-800 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              filterCat === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 shadow-2xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase">
                  {res.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30">
                  {res.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1.5">
                {res.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                Provider: {res.authorOrProvider}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {res.description}
              </p>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Recommended For: {res.recommendedFor}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Visit Official Source</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
