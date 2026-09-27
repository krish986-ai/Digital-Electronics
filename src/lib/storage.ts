import { UserProgress, ColorTheme } from '../types';

const STORAGE_KEY = 'digilearn_user_data_v1';

const defaultProgress: UserProgress = {
  completedTopicSlugs: ['intro-to-digital-electronics'],
  bookmarkedItemIds: [],
  quizAttempts: [],
  notes: {},
  theme: 'light',
  colorTheme: 'blue',
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function setColorTheme(theme: ColorTheme): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = { ...current, colorTheme: theme };
  saveProgress(updated);
  return updated;
}

export function toggleTopicCompleted(slug: string): UserProgress {
  const current = loadProgress();
  const exists = current.completedTopicSlugs.includes(slug);
  const updatedSlugs = exists
    ? current.completedTopicSlugs.filter((s) => s !== slug)
    : [...current.completedTopicSlugs, slug];
  const updated: UserProgress = { ...current, completedTopicSlugs: updatedSlugs };
  saveProgress(updated);
  return updated;
}

export function toggleBookmark(item: { type: 'topic' | 'question' | 'formula' | 'resource'; id: string; title: string }): UserProgress {
  const current = loadProgress();
  const exists = current.bookmarkedItemIds.some((b) => b.id === item.id && b.type === item.type);
  const updatedBookmarks = exists
    ? current.bookmarkedItemIds.filter((b) => !(b.id === item.id && b.type === item.type))
    : [...current.bookmarkedItemIds, item];
  const updated: UserProgress = { ...current, bookmarkedItemIds: updatedBookmarks };
  saveProgress(updated);
  return updated;
}

export function isBookmarked(type: 'topic' | 'question' | 'formula' | 'resource', id: string): boolean {
  const current = loadProgress();
  return current.bookmarkedItemIds.some((b) => b.id === id && b.type === type);
}

export function saveUserNote(slug: string, noteText: string): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = {
    ...current,
    notes: {
      ...current.notes,
      [slug]: noteText,
    },
  };
  saveProgress(updated);
  return updated;
}

export function recordQuizAttempt(score: number, total: number, timeSpentSeconds: number, unitId?: string): UserProgress {
  const current = loadProgress();
  const newAttempt = {
    id: 'quiz_' + Date.now(),
    date: new Date().toISOString(),
    unitId,
    score,
    total,
    timeSpentSeconds,
  };
  const updated: UserProgress = {
    ...current,
    quizAttempts: [newAttempt, ...current.quizAttempts].slice(0, 50),
  };
  saveProgress(updated);
  return updated;
}
