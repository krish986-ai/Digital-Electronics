import React from 'react';
import { CheckCircle, Bookmark, Award, ArrowRight, Trash2, Palette, Sparkles, Check } from 'lucide-react';
import { UserProgress, ColorTheme } from '../types';
import { UNITS } from '../content/units';
import { ALL_TOPICS } from '../content/topics';
import { COLOR_THEMES, getThemeConfig } from '../lib/theme';

interface DashboardPageProps {
  progress: UserProgress;
  onSelectTopic: (slug: string) => void;
  onNavigateTab: (tab: string) => void;
  onResetProgress: () => void;
  colorTheme?: ColorTheme;
  onSelectColorTheme?: (theme: ColorTheme) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  progress,
  onSelectTopic,
  onNavigateTab,
  onResetProgress,
  colorTheme = 'blue',
  onSelectColorTheme,
}) => {
  const totalTopics = ALL_TOPICS.length;
  const completedCount = progress.completedTopicSlugs.length;
  const overallPercentage = Math.round((completedCount / totalTopics) * 100);
  const currentThemeConfig = getThemeConfig(colorTheme);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header - High Contrast Academic Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
            Local Browser Storage
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
            My Learning Dashboard
          </h1>
          <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 font-medium">
            Track your curriculum coverage, review bookmarked notes, and inspect exam scores.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-700 dark:text-rose-300 border-2 border-rose-300 dark:border-rose-900 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Visual Color Theme Palette Selector Card */}
      {onSelectColorTheme && (
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-extrabold text-slate-950 dark:text-white font-display">
                Visual Theme & Color Accent
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Active: <strong className="text-blue-700 dark:text-blue-400">{currentThemeConfig.name}</strong>
            </span>
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 mb-4 leading-relaxed font-medium">
            Customize the platform accent palette. Choose between vibrant high-contrast academic themes:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((key) => {
              const cfg = COLOR_THEMES[key];
              const isSelected = colorTheme === key;

              return (
                <button
                  key={key}
                  onClick={() => onSelectColorTheme(key)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-200 font-bold shadow-xs scale-102'
                      : 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="h-4 w-4 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: cfg.dotColor }}
                    />
                    {isSelected && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div className="text-xs font-semibold">{cfg.shortName}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                    {cfg.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium text-slate-600 dark:text-slate-400">Curriculum Completion</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {overallPercentage}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {completedCount} of {totalTopics} topics mastered
          </div>
          <div className="mt-3 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium text-slate-600 dark:text-slate-400">Saved Bookmarks</span>
            <Bookmark className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {progress.bookmarkedItemIds.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Topics, formulas, & questions saved
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium text-slate-600 dark:text-slate-400">Exams & Quizzes Taken</span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {progress.quizAttempts.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Practice evaluations recorded
          </div>
        </div>
      </div>

      {/* Unit-by-Unit Completion Breakdown */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
          Curriculum Unit Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UNITS.map((u) => {
            const unitTopics = ALL_TOPICS.filter((t) => t.unitId === u.id);
            const doneInUnit = unitTopics.filter((t) =>
              progress.completedTopicSlugs.includes(t.slug)
            ).length;
            const pct = Math.round((doneInUnit / (unitTopics.length || 1)) * 100);

            return (
              <div
                key={u.id}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
                    Unit {u.number}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {u.title}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span>{pct}%</span>
                    <span>{doneInUnit}/{unitTopics.length}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Items List */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
          Saved Bookmarks ({progress.bookmarkedItemIds.length})
        </h2>

        {progress.bookmarkedItemIds.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center">
            No bookmarks saved yet. Click the bookmark icon on any topic or formula to pin it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {progress.bookmarkedItemIds.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.type === 'topic') onSelectTopic(item.id);
                  else if (item.type === 'formula') onNavigateTab('formulas');
                }}
                className="cursor-pointer p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900 flex items-center justify-between text-xs transition-colors shadow-2xs"
              >
                <div>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase font-semibold">
                    {item.type}
                  </span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {item.title}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz Attempt History */}
      {progress.quizAttempts.length > 0 && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Recent Exam Simulator Scores
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono">
            {progress.quizAttempts.map((attempt) => (
              <div key={attempt.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-slate-400">
                    {new Date(attempt.date).toLocaleDateString()}
                  </span>
                  <span className="ml-2 font-sans font-medium text-slate-700 dark:text-slate-300">
                    Score: {attempt.score} / {attempt.total} (
                    {Math.round((attempt.score / attempt.total) * 100)}%)
                  </span>
                </div>
                <span className="text-slate-400">Time: {attempt.timeSpentSeconds}s</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
