import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle, ArrowRight, Clock, Award, Layers, Sparkles, X, RotateCcw } from 'lucide-react';
import { UNITS } from '../content/units';
import { ALL_TOPICS } from '../content/topics';

interface CurriculumPageProps {
  onSelectTopic: (slug: string) => void;
  completedTopicSlugs: string[];
  initialUnitId?: string;
}

export const CurriculumPage: React.FC<CurriculumPageProps> = ({
  onSelectTopic,
  completedTopicSlugs,
  initialUnitId = 'all',
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [searchFilter, setSearchFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Sync if initialUnitId changes externally
  React.useEffect(() => {
    if (initialUnitId) {
      setSelectedUnitId(initialUnitId);
    }
  }, [initialUnitId]);

  // Vibrant high-contrast badge styles for each of the 9 units
  const unitBadgeStyles: Record<number, { bg: string; text: string; border: string; activeBg: string }> = {
    1: { bg: 'bg-blue-100 text-blue-950', text: 'text-blue-950 dark:text-blue-100', border: 'border-blue-400 dark:border-blue-600', activeBg: 'bg-blue-600 text-white' },
    2: { bg: 'bg-indigo-100 text-indigo-950', text: 'text-indigo-950 dark:text-indigo-100', border: 'border-indigo-400 dark:border-indigo-600', activeBg: 'bg-indigo-600 text-white' },
    3: { bg: 'bg-teal-100 text-teal-950', text: 'text-teal-950 dark:text-teal-100', border: 'border-teal-400 dark:border-teal-600', activeBg: 'bg-teal-600 text-white' },
    4: { bg: 'bg-emerald-100 text-emerald-950', text: 'text-emerald-950 dark:text-emerald-100', border: 'border-emerald-400 dark:border-emerald-600', activeBg: 'bg-emerald-600 text-white' },
    5: { bg: 'bg-amber-100 text-amber-950', text: 'text-amber-950 dark:text-amber-100', border: 'border-amber-400 dark:border-amber-600', activeBg: 'bg-amber-600 text-white' },
    6: { bg: 'bg-rose-100 text-rose-950', text: 'text-rose-950 dark:text-rose-100', border: 'border-rose-400 dark:border-rose-600', activeBg: 'bg-rose-600 text-white' },
    7: { bg: 'bg-purple-100 text-purple-950', text: 'text-purple-950 dark:text-purple-100', border: 'border-purple-400 dark:border-purple-600', activeBg: 'bg-purple-600 text-white' },
    8: { bg: 'bg-sky-100 text-sky-950', text: 'text-sky-950 dark:text-sky-100', border: 'border-sky-400 dark:border-sky-600', activeBg: 'bg-sky-600 text-white' },
    9: { bg: 'bg-slate-200 text-slate-950', text: 'text-slate-950 dark:text-slate-100', border: 'border-slate-400 dark:border-slate-600', activeBg: 'bg-slate-800 text-white' },
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-950 border-2 border-emerald-400 dark:bg-emerald-950/80 dark:text-emerald-100 dark:border-emerald-600';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-950 border-2 border-blue-400 dark:bg-blue-950/80 dark:text-blue-100 dark:border-blue-600';
      case 'Advanced':
        return 'bg-purple-100 text-purple-950 border-2 border-purple-400 dark:bg-purple-950/80 dark:text-purple-100 dark:border-purple-600';
      default:
        return 'bg-slate-200 text-slate-950 border-2 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700';
    }
  };

  // Smart unit selector that prevents blank empty screens
  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    // If the active difficulty filter has 0 topics for this unit, reset to 'All'
    if (difficultyFilter !== 'All') {
      const matchCount = ALL_TOPICS.filter(
        (t) => (unitId === 'all' || t.unitId === unitId) && t.difficulty === difficultyFilter
      ).length;
      if (matchCount === 0) {
        setDifficultyFilter('All');
      }
    }
  };

  const filteredTopics = ALL_TOPICS.filter((topic) => {
    const matchesUnit = selectedUnitId === 'all' || topic.unitId === selectedUnitId;
    const matchesSearch =
      !searchFilter.trim() ||
      topic.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      topic.shortDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
      topic.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesDiff = difficultyFilter === 'All' || topic.difficulty === difficultyFilter;
    return matchesUnit && matchesSearch && matchesDiff;
  });

  const selectedUnit = UNITS.find((u) => u.id === selectedUnitId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner - High Contrast Academic */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Complete Engineering Curriculum
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
              Digital Electronics Course Modules
            </h1>
            <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-2xl leading-relaxed font-medium">
              Structured sequentially across 9 core engineering units. Select any topic to access Beginner and Deep Technical explanations, solved problems, interactive schematics, and university exam preparation.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-950 px-5 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-800 text-xs">
            <div>
              <div className="text-[11px] text-slate-800 dark:text-slate-200 font-extrabold uppercase">Completed</div>
              <div className="font-mono text-xl font-black text-emerald-600 dark:text-emerald-400">
                {completedTopicSlugs.length} / {ALL_TOPICS.length}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:border-slate-700" />
            <div>
              <div className="text-[11px] text-slate-800 dark:text-slate-200 font-extrabold uppercase">Curriculum Progress</div>
              <div className="font-mono text-xl font-black text-blue-600 dark:text-blue-400">
                {Math.round((completedTopicSlugs.length / ALL_TOPICS.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Search with Clear Button */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700 dark:text-slate-300" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter topics by keyword or tag..."
            className="w-full rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-10 py-2.5 text-xs font-bold text-slate-950 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-600 shadow-xs"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Difficulty segmented control with dynamic counts */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-xs">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => {
            const count = ALL_TOPICS.filter(
              (t) =>
                (selectedUnitId === 'all' || t.unitId === selectedUnitId) &&
                (diff === 'All' || t.difficulty === diff)
            ).length;
            const isSel = difficultyFilter === diff;

            return (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-500/20'
                    : count === 0
                    ? 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                    : 'text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{diff}</span>
                <span
                  className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded-full ${
                    isSel
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Units Horizontal Filter Tabs with High Contrast Unit Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => handleSelectUnit('all')}
          className={`px-4 py-2 text-xs font-black rounded-xl whitespace-nowrap border-2 transition-all cursor-pointer ${
            selectedUnitId === 'all'
              ? 'border-blue-600 bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20 scale-102'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 hover:border-blue-500 shadow-xs'
          }`}
        >
          All Units ({ALL_TOPICS.length})
        </button>
        {UNITS.map((u) => {
          const count = ALL_TOPICS.filter((t) => t.unitId === u.id).length;
          const isSel = selectedUnitId === u.id;
          const badgeStyle = unitBadgeStyles[u.number] || unitBadgeStyles[1];

          return (
            <button
              key={u.id}
              onClick={() => handleSelectUnit(u.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSel
                  ? 'border-blue-600 bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-500/20 scale-102'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 hover:border-blue-500 shadow-xs'
              }`}
            >
              <span
                className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-black border ${
                  isSel ? 'bg-white text-blue-900 border-white' : `${badgeStyle.bg} ${badgeStyle.border}`
                }`}
              >
                U{u.number}
              </span>
              <span>{u.title.split('&')[0].trim()}</span>
              <span
                className={`ml-1 text-[11px] font-mono font-black ${
                  isSel ? 'text-blue-100' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Topics List with High Contrast Cards and Color Badges */}
      {filteredTopics.length === 0 ? (
        <div className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 p-10 text-center bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="text-base font-extrabold text-slate-950 dark:text-white">
            No topics match active filters in {selectedUnit ? selectedUnit.title : 'this category'}.
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {difficultyFilter !== 'All' ? `Difficulty is currently set to "${difficultyFilter}". ` : ''}
            {searchFilter ? `Search keyword: "${searchFilter}". ` : ''}
            Reset your filters to view all available modules.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchFilter('');
                setDifficultyFilter('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters & Show All {selectedUnit ? selectedUnit.title : 'Curriculum'} Topics (
              {ALL_TOPICS.filter((t) => selectedUnitId === 'all' || t.unitId === selectedUnitId).length})
            </button>
            {selectedUnitId !== 'all' && (
              <button
                onClick={() => {
                  setSelectedUnitId('all');
                  setSearchFilter('');
                  setDifficultyFilter('All');
                }}
                className="px-5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
              >
                View All 9 Units ({ALL_TOPICS.length})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const isCompleted = completedTopicSlugs.includes(topic.slug);
            const unitBadge = unitBadgeStyles[topic.unitNumber] || unitBadgeStyles[1];
            const diffClass = getDifficultyBadge(topic.difficulty);

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.slug)}
                className="group cursor-pointer rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span
                      className={`font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full border ${unitBadge.bg} ${unitBadge.border}`}
                    >
                      Unit {topic.unitNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 text-xs font-bold">
                      <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{topic.estimatedMinutes} min</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors font-display">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-3 mt-2.5 leading-relaxed font-medium">
                    {topic.shortDescription}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-black text-emerald-950 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border-2 border-emerald-500">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> Completed
                      </span>
                    ) : (
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${diffClass}`}>
                        {topic.difficulty}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-black text-blue-700 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Start Learning <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
