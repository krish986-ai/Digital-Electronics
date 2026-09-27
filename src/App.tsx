import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HomePage } from './pages/HomePage';
import { CurriculumPage } from './pages/CurriculumPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { LabPage } from './pages/LabPage';
import { SolversPage } from './pages/SolversPage';
import { PracticePage } from './pages/PracticePage';
import { FormulaPage } from './pages/FormulaPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { DashboardPage } from './pages/DashboardPage';
import { getTopicBySlug } from './content/topics';
import {
  loadProgress,
  saveProgress,
  toggleTopicCompleted,
  toggleBookmark,
  setColorTheme,
} from './lib/storage';
import { UserProgress, ColorTheme } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedTopicSlug, setSelectedTopicSlug] = useState<string | null>(null);
  const [curriculumUnitId, setCurriculumUnitId] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  const VALID_TABS = ['home', 'learn', 'lab', 'solvers', 'practice', 'formulas', 'glossary', 'resources', 'dashboard'] as const;

  // Apply dark mode class to <html> element
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  const activeColorTheme: ColorTheme = progress.colorTheme || 'blue';

  const handleSelectColorTheme = (theme: ColorTheme) => {
    const updated = setColorTheme(theme);
    setProgress(updated);
  };

  // Handle URL hash changes or direct deep linking safely
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash) return;

      if (rawHash.startsWith('topic/')) {
        const slug = rawHash.replace('topic/', '');
        setSelectedTopicSlug(slug);
        setCurrentTab('learn');
      } else if (rawHash.startsWith('unit/')) {
        const uId = rawHash.replace('unit/', '');
        setCurriculumUnitId(uId);
        setSelectedTopicSlug(null);
        setCurrentTab('learn');
      } else if ((VALID_TABS as readonly string[]).includes(rawHash)) {
        setCurrentTab(rawHash);
        setSelectedTopicSlug(null);
      }
      // In-page section anchors (e.g. #theory, #problems) are preserved without resetting tab state
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigateTab = (tab: string) => {
    const targetTab = (VALID_TABS as readonly string[]).includes(tab) ? tab : 'home';
    setCurrentTab(targetTab);
    setSelectedTopicSlug(null);
    window.location.hash = targetTab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (slug: string) => {
    setSelectedTopicSlug(slug);
    setCurrentTab('learn');
    window.location.hash = `topic/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    const newTheme = progress.theme === 'dark' ? 'light' : 'dark';
    const updated = { ...progress, theme: newTheme as 'light' | 'dark' };
    setProgress(updated);
    saveProgress(updated);
  };

  const handleToggleTopicCompleted = (slug: string) => {
    const updated = toggleTopicCompleted(slug);
    setProgress(updated);
  };

  const handleToggleBookmarkItem = (item: {
    type: 'topic' | 'question' | 'formula' | 'resource';
    id: string;
    title: string;
  }) => {
    const updated = toggleBookmark(item);
    setProgress(updated);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your learning progress and bookmarks?')) {
      const resetData: UserProgress = {
        completedTopicSlugs: [],
        bookmarkedItemIds: [],
        quizAttempts: [],
        notes: {},
        theme: progress.theme,
      };
      saveProgress(resetData);
      setProgress(resetData);
    }
  };

  const currentTopic = selectedTopicSlug ? getTopicBySlug(selectedTopicSlug) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50 transition-colors">
      {/* Universal Top Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigateTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={progress.theme}
        onToggleTheme={handleToggleTheme}
        bookmarkCount={progress.bookmarkedItemIds.length}
        colorTheme={activeColorTheme}
        onSelectColorTheme={handleSelectColorTheme}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {(currentTab === 'home' || !(VALID_TABS as readonly string[]).includes(currentTab)) && (
          <HomePage
            onNavigateTab={handleNavigateTab}
            onSelectTopic={handleSelectTopic}
            completedTopicSlugs={progress.completedTopicSlugs}
            colorTheme={activeColorTheme}
            onSelectColorTheme={handleSelectColorTheme}
            onSelectUnit={(uId) => setCurriculumUnitId(uId)}
          />
        )}

        {currentTab === 'learn' && (
          <>
            {currentTopic ? (
              <TopicDetailPage
                topic={currentTopic}
                onBack={() => {
                  setSelectedTopicSlug(null);
                  window.location.hash = 'learn';
                }}
                onNavigateTopic={handleSelectTopic}
                isCompleted={progress.completedTopicSlugs.includes(currentTopic.slug)}
                onToggleCompleted={() => handleToggleTopicCompleted(currentTopic.slug)}
                isBookmarked={progress.bookmarkedItemIds.some(
                  (b) => b.id === currentTopic.slug && b.type === 'topic'
                )}
                onToggleBookmark={() =>
                  handleToggleBookmarkItem({
                    type: 'topic',
                    id: currentTopic.slug,
                    title: currentTopic.title,
                  })
                }
              />
            ) : (
              <CurriculumPage
                onSelectTopic={handleSelectTopic}
                completedTopicSlugs={progress.completedTopicSlugs}
                initialUnitId={curriculumUnitId}
              />
            )}
          </>
        )}

        {currentTab === 'lab' && <LabPage />}

        {currentTab === 'solvers' && <SolversPage />}

        {currentTab === 'practice' && <PracticePage />}

        {currentTab === 'formulas' && <FormulaPage />}

        {currentTab === 'glossary' && <GlossaryPage />}

        {currentTab === 'resources' && <ResourcesPage />}

        {currentTab === 'dashboard' && (
          <DashboardPage
            progress={progress}
            onSelectTopic={handleSelectTopic}
            onNavigateTab={handleNavigateTab}
            onResetProgress={handleResetProgress}
            colorTheme={activeColorTheme}
            onSelectColorTheme={handleSelectColorTheme}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateTab}
        colorTheme={activeColorTheme}
        onSelectColorTheme={handleSelectColorTheme}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        onNavigateTab={handleNavigateTab}
      />
    </div>
  );
}
