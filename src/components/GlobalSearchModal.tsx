import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, HelpCircle, FileText, Wrench } from 'lucide-react';
import { ALL_TOPICS } from '../content/topics';
import { FORMULAS } from '../content/formulas';
import { QUESTIONS } from '../content/questions';
import { GLOSSARY } from '../content/glossary';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (slug: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigateTab('search'); // or open search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigateTab]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedTopics = q
    ? ALL_TOPICS.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      ).slice(0, 5)
    : [];

  const matchedFormulas = q
    ? FORMULAS.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.meaning.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedGlossary = q
    ? GLOSSARY.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.simpleDef.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedQuestions = q
    ? QUESTIONS.filter(
        (quest) =>
          quest.question.toLowerCase().includes(q) ||
          quest.topicName.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalResults =
    matchedTopics.length +
    matchedFormulas.length +
    matchedGlossary.length +
    matchedQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, formulas, questions, glossary (e.g. K-Map, 2's Complement, Flip-Flop)..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!q ? (
            <div className="py-6 text-center text-xs text-slate-400">
              Type keywords to search across DigiLearn’s complete digital electronics encyclopedia.
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['De Morgan', 'K-Map', 'Full Adder', 'JK Flip-Flop', 'R-2R Ladder', 'TTL vs CMOS'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="rounded-md border border-slate-200 dark:border-slate-800 px-2 py-1 text-[11px] text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found matching "{query}". Try checking your spelling or searching for broader terms like "Adder", "Flip-Flop", or "Radix".
            </div>
          ) : (
            <>
              {/* Matched Topics */}
              {matchedTopics.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Curriculum Topics ({matchedTopics.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          onSelectTopic(topic.slug);
                          onClose();
                        }}
                        className="w-full text-left flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {topic.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {topic.shortDescription}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Formulas */}
              {matchedFormulas.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Formulas ({matchedFormulas.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedFormulas.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          onNavigateTab('formulas');
                          onClose();
                        }}
                        className="w-full text-left flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {f.name}
                          </div>
                          <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                            {f.formula}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Glossary */}
              {matchedGlossary.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Glossary Definitions ({matchedGlossary.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedGlossary.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          onNavigateTab('glossary');
                          onClose();
                        }}
                        className="w-full text-left flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <Wrench className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {g.term}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {g.simpleDef}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Practice Questions */}
              {matchedQuestions.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Practice Questions ({matchedQuestions.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedQuestions.map((quest) => (
                      <button
                        key={quest.id}
                        onClick={() => {
                          onNavigateTab('practice');
                          onClose();
                        }}
                        className="w-full text-left flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                            {quest.question}
                          </div>
                          <div className="text-xs text-slate-400">
                            Topic: {quest.topicName} · Difficulty: {quest.difficulty}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to close</span>
          <span>DigiLearn Search Engine</span>
        </div>
      </div>
    </div>
  );
};
