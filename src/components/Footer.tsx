import React from 'react';
import { ColorTheme } from '../types';
import { COLOR_THEMES, getThemeConfig } from '../lib/theme';

interface FooterProps {
  onNavigate: (tab: string) => void;
  colorTheme?: ColorTheme;
  onSelectColorTheme?: (theme: ColorTheme) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  colorTheme = 'blue',
  onSelectColorTheme,
}) => {
  const currentThemeConfig = getThemeConfig(colorTheme);

  return (
    <footer className="w-full border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${currentThemeConfig.btnPrimary} font-mono text-xs font-black shadow-xs`}>
                01
              </div>
              <span className="font-display font-black text-slate-950 dark:text-white text-lg">
                DigiLearn
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium">
              A free, open-access educational platform for Digital Electronics and Computer Architecture. From fundamental gates to processor microarchitecture.
            </p>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">
              Free forever · No registration · Open curriculum
            </div>

            {/* Quick Palette Dot Switcher in Footer */}
            {onSelectColorTheme && (
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Color Palette
                </span>
                <div className="flex items-center gap-2">
                  {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((key) => {
                    const cfg = COLOR_THEMES[key];
                    const isSel = colorTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => onSelectColorTheme(key)}
                        className={`h-5 w-5 rounded-full border border-black/20 transition-transform cursor-pointer ${
                          isSel ? 'ring-2 ring-blue-600 scale-125' : 'hover:scale-110 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cfg.dotColor }}
                        title={cfg.name}
                        aria-label={cfg.name}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white mb-3">
              Curriculum Modules
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                  Unit 1: Fundamentals & Numbers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                  Unit 2: Boolean Algebra & Gates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                  Unit 3: K-Maps & Minimization
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                  Unit 4: Combinational Circuits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                  Unit 5: Flip-Flops & Sequential
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Digital Logic Circuit Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solvers')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  K-Map Solver (2, 3, 4 Vars)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solvers')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Boolean Expression Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solvers')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Radix & Complement Converter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solvers')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  ADC & DAC Calculator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Exam Preparation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Interactive Practice Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Timed Exam Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('formulas')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Engineering Formula Handbook
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glossary')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Technical Glossary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Free Textbooks & OCW Links
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            DigiLearn — Digital Electronics Education · White & Blue Engineering Standard Theme
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="hover:underline cursor-pointer">Home</button>
            <button onClick={() => onNavigate('learn')} className="hover:underline cursor-pointer">Curriculum</button>
            <button onClick={() => onNavigate('resources')} className="hover:underline cursor-pointer">Open Courses</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:underline cursor-pointer">My Progress</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
