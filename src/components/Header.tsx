import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Bookmark, Palette, Check, Sparkles } from 'lucide-react';
import { ColorTheme } from '../types';
import { COLOR_THEMES, getThemeConfig } from '../lib/theme';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  bookmarkCount: number;
  colorTheme: ColorTheme;
  onSelectColorTheme: (theme: ColorTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
  bookmarkCount,
  colorTheme,
  onSelectColorTheme,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const currentThemeConfig = getThemeConfig(colorTheme);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Curriculum' },
    { id: 'lab', label: 'Interactive Lab' },
    { id: 'solvers', label: 'Solvers & Tools' },
    { id: 'practice', label: 'Practice & Exam' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'resources', label: 'Resources' },
  ];

  // Close color picker dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors shadow-xs">
      {/* Top Academic Sub-banner with High Contrast */}
      <div className="hidden sm:flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-900 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">DigiLearn Academic Engineering</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200 font-medium">Standard University Syllabus & GATE Exam Standards</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">100% Free & Open Access</span>
          <span className="text-slate-400">·</span>
          <span>Theme: <strong className="text-cyan-300 font-extrabold">{currentThemeConfig.name}</strong></span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${currentThemeConfig.btnPrimary} shadow-md transition-all duration-200 group-hover:scale-105`}>
            {/* Logic Gate IC Icon */}
            <div className="relative flex items-center justify-center">
              <span className="font-mono text-xs font-black tracking-tighter text-white">01</span>
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white font-display flex items-center gap-1.5">
              DigiLearn
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-950 dark:bg-blue-900/90 dark:text-blue-100 font-black tracking-wider border border-blue-400 dark:border-blue-600">
                EE
              </span>
            </span>
            <span className="block text-[11px] text-slate-700 dark:text-slate-300 -mt-0.5 tracking-tight font-bold">
              Digital Electronics Platform
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? `${currentThemeConfig.textPrimary} font-extrabold`
                    : 'text-slate-800 hover:text-blue-700 dark:text-slate-200 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className={`absolute -bottom-1.5 left-0 right-0 h-0.5 ${currentThemeConfig.navIndicator} rounded-full`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Color Theme, Search, Dark/Light, My Learning) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 transition-colors shadow-xs cursor-pointer"
            title="Search curriculum (Ctrl+K or ⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:inline rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-800 dark:bg-slate-700 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Color Palette Switcher Dropdown */}
          <div className="relative" ref={colorPickerRef}>
            <button
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center gap-1.5 rounded-xl border-2 border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors shadow-xs cursor-pointer"
              title="Change Color Theme"
              aria-label="Color Theme"
            >
              <div
                className="h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-xs"
                style={{ backgroundColor: currentThemeConfig.dotColor }}
              />
              <span className="hidden md:inline text-[11px] font-bold">
                Theme
              </span>
              <Palette className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
            </button>

            {/* Dropdown Menu for Color Themes */}
            {isColorPickerOpen && (
              <div className="absolute right-0 mt-2 w-68 rounded-2xl border-2 border-slate-300 bg-white p-2.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 z-50">
                <div className="px-2 py-1.5 mb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    <span>Select Color Palette</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    High-contrast color themes for maximum clarity
                  </p>
                </div>

                <div className="space-y-1">
                  {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((key) => {
                    const cfg = COLOR_THEMES[key];
                    const isSelected = colorTheme === key;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onSelectColorTheme(key);
                          setIsColorPickerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-100 text-blue-950 dark:bg-blue-950 dark:text-blue-100 font-extrabold border border-blue-400 dark:border-blue-600'
                            : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="h-4 w-4 rounded-full border border-black/20 dark:border-white/20 shrink-0 shadow-xs"
                            style={{ backgroundColor: cfg.dotColor }}
                          />
                          <div>
                            <div className="font-bold text-xs leading-tight text-slate-950 dark:text-white">
                              {cfg.name}
                            </div>
                            <div className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                              {cfg.tagline}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 rounded-xl border-2 border-slate-300 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors shadow-xs cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline text-[11px] font-bold">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-slate-900" />
                <span className="hidden sm:inline text-[11px] font-bold">Dark</span>
              </>
            )}
          </button>

          {/* My Learning Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors shadow-xs cursor-pointer ${
              currentTab === 'dashboard'
                ? currentThemeConfig.btnPrimary
                : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 border border-slate-800'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">My Learning</span>
            {bookmarkCount > 0 && (
              <span className="font-mono text-[11px] font-bold bg-white/20 px-1 rounded">({bookmarkCount})</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-200 dark:border-slate-800 px-4 py-2 gap-4 text-xs font-bold no-scrollbar bg-white dark:bg-slate-900">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap py-1 cursor-pointer ${
              currentTab === item.id
                ? `${currentThemeConfig.textPrimary} font-black border-b-2 ${currentThemeConfig.borderPrimary}`
                : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
