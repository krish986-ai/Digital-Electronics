import { ColorTheme } from '../types';

export interface ColorThemeConfig {
  id: ColorTheme;
  name: string;
  shortName: string;
  tagline: string;
  dotColor: string;
  bgDot: string;
  // Primary action buttons
  btnPrimary: string;
  // Text colors
  textPrimary: string;
  textPrimaryHover: string;
  // Backgrounds
  bgLight: string;
  bgLightHover: string;
  bgSubtle: string;
  // Borders
  borderPrimary: string;
  borderSubtle: string;
  // Badges & Pills
  badgeClass: string;
  // Glows / Shadows
  shadowGlow: string;
  // Active nav bar indicator
  navIndicator: string;
  // Banner background
  heroGradient: string;
}

export const COLOR_THEMES: Record<ColorTheme, ColorThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Electric Cobalt (High Contrast)',
    shortName: 'Cobalt Blue',
    tagline: 'High-Contrast Academic Engineering Blue',
    dotColor: '#1d4ed8',
    bgDot: 'bg-blue-600',
    btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md shadow-blue-600/30',
    textPrimary: 'text-blue-800 dark:text-blue-400 font-bold',
    textPrimaryHover: 'hover:text-blue-900 dark:hover:text-blue-300',
    bgLight: 'bg-blue-100 dark:bg-blue-950/70',
    bgLightHover: 'hover:bg-blue-100 dark:hover:bg-blue-950/80',
    bgSubtle: 'bg-blue-50/90 dark:bg-blue-950/50',
    borderPrimary: 'border-blue-600 dark:border-blue-400',
    borderSubtle: 'border-blue-300 dark:border-blue-700',
    badgeClass: 'bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950/90 dark:text-blue-200 dark:border-blue-600 font-extrabold',
    shadowGlow: 'shadow-blue-600/30',
    navIndicator: 'bg-blue-600 dark:bg-blue-400',
    heroGradient: 'from-blue-100/70 via-white to-white dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-950',
  },
  emerald: {
    id: 'emerald',
    name: 'Silicon Emerald (High Contrast)',
    shortName: 'PCB Emerald',
    tagline: 'Hardware PCB Circuit & Silicon Green',
    dotColor: '#059669',
    bgDot: 'bg-emerald-600',
    btnPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-600/30',
    textPrimary: 'text-emerald-800 dark:text-emerald-400 font-bold',
    textPrimaryHover: 'hover:text-emerald-900 dark:hover:text-emerald-300',
    bgLight: 'bg-emerald-100 dark:bg-emerald-950/70',
    bgLightHover: 'hover:bg-emerald-100 dark:hover:bg-emerald-950/80',
    bgSubtle: 'bg-emerald-50/90 dark:bg-emerald-950/50',
    borderPrimary: 'border-emerald-600 dark:border-emerald-400',
    borderSubtle: 'border-emerald-300 dark:border-emerald-700',
    badgeClass: 'bg-emerald-100 text-emerald-950 border border-emerald-400 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-600 font-extrabold',
    shadowGlow: 'shadow-emerald-600/30',
    navIndicator: 'bg-emerald-600 dark:bg-emerald-400',
    heroGradient: 'from-emerald-100/70 via-white to-white dark:from-slate-950 dark:via-emerald-950/30 dark:to-slate-950',
  },
  violet: {
    id: 'violet',
    name: 'Quantum Violet (High Contrast)',
    shortName: 'Deep Violet',
    tagline: 'Academic Physics & Deep Purple',
    dotColor: '#7c3aed',
    bgDot: 'bg-violet-600',
    btnPrimary: 'bg-violet-600 hover:bg-violet-700 text-white font-extrabold shadow-md shadow-violet-600/30',
    textPrimary: 'text-violet-800 dark:text-violet-400 font-bold',
    textPrimaryHover: 'hover:text-violet-900 dark:hover:text-violet-300',
    bgLight: 'bg-violet-100 dark:bg-violet-950/70',
    bgLightHover: 'hover:bg-violet-100 dark:hover:bg-violet-950/80',
    bgSubtle: 'bg-violet-50/90 dark:bg-violet-950/50',
    borderPrimary: 'border-violet-600 dark:border-violet-400',
    borderSubtle: 'border-violet-300 dark:border-violet-700',
    badgeClass: 'bg-violet-100 text-violet-950 border border-violet-400 dark:bg-violet-950/90 dark:text-violet-200 dark:border-violet-600 font-extrabold',
    shadowGlow: 'shadow-violet-600/30',
    navIndicator: 'bg-violet-600 dark:bg-violet-400',
    heroGradient: 'from-violet-100/70 via-white to-white dark:from-slate-950 dark:via-violet-950/30 dark:to-slate-950',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan (High Contrast)',
    shortName: 'Cyber Cyan',
    tagline: 'High-Speed Quantum & Modern Teal',
    dotColor: '#0891b2',
    bgDot: 'bg-cyan-600',
    btnPrimary: 'bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold shadow-md shadow-cyan-600/30',
    textPrimary: 'text-cyan-800 dark:text-cyan-400 font-bold',
    textPrimaryHover: 'hover:text-cyan-900 dark:hover:text-cyan-300',
    bgLight: 'bg-cyan-100 dark:bg-cyan-950/70',
    bgLightHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-950/80',
    bgSubtle: 'bg-cyan-50/90 dark:bg-cyan-950/50',
    borderPrimary: 'border-cyan-600 dark:border-cyan-400',
    borderSubtle: 'border-cyan-300 dark:border-cyan-700',
    badgeClass: 'bg-cyan-100 text-cyan-950 border border-cyan-400 dark:bg-cyan-950/90 dark:text-cyan-200 dark:border-cyan-600 font-extrabold',
    shadowGlow: 'shadow-cyan-600/30',
    navIndicator: 'bg-cyan-600 dark:bg-cyan-400',
    heroGradient: 'from-cyan-100/70 via-white to-white dark:from-slate-950 dark:via-cyan-950/30 dark:to-slate-950',
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber (High Contrast)',
    shortName: 'Solar Gold',
    tagline: 'Industrial Precision & Silicon Gold',
    dotColor: '#d97706',
    bgDot: 'bg-amber-600',
    btnPrimary: 'bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-md shadow-amber-600/30',
    textPrimary: 'text-amber-800 dark:text-amber-400 font-bold',
    textPrimaryHover: 'hover:text-amber-900 dark:hover:text-amber-300',
    bgLight: 'bg-amber-100 dark:bg-amber-950/70',
    bgLightHover: 'hover:bg-amber-100 dark:hover:bg-amber-950/80',
    bgSubtle: 'bg-amber-50/90 dark:bg-amber-950/50',
    borderPrimary: 'border-amber-600 dark:border-amber-400',
    borderSubtle: 'border-amber-300 dark:border-amber-700',
    badgeClass: 'bg-amber-100 text-amber-950 border border-amber-400 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-600 font-extrabold',
    shadowGlow: 'shadow-amber-600/30',
    navIndicator: 'bg-amber-600 dark:bg-amber-400',
    heroGradient: 'from-amber-100/70 via-white to-white dark:from-slate-950 dark:via-amber-950/30 dark:to-slate-950',
  },
  crimson: {
    id: 'crimson',
    name: 'Logic Crimson (High Contrast)',
    shortName: 'Rose Crimson',
    tagline: 'High-Frequency Semiconductor & Rose',
    dotColor: '#e11d48',
    bgDot: 'bg-rose-600',
    btnPrimary: 'bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-md shadow-rose-600/30',
    textPrimary: 'text-rose-800 dark:text-rose-400 font-bold',
    textPrimaryHover: 'hover:text-rose-900 dark:hover:text-rose-300',
    bgLight: 'bg-rose-100 dark:bg-rose-950/70',
    bgLightHover: 'hover:bg-rose-100 dark:hover:bg-rose-950/80',
    bgSubtle: 'bg-rose-50/90 dark:bg-rose-950/50',
    borderPrimary: 'border-rose-600 dark:border-rose-400',
    borderSubtle: 'border-rose-300 dark:border-rose-700',
    badgeClass: 'bg-rose-100 text-rose-950 border border-rose-400 dark:bg-rose-950/90 dark:text-rose-200 dark:border-rose-600 font-extrabold',
    shadowGlow: 'shadow-rose-600/30',
    navIndicator: 'bg-rose-600 dark:bg-rose-400',
    heroGradient: 'from-rose-100/70 via-white to-white dark:from-slate-950 dark:via-rose-950/30 dark:to-slate-950',
  },
};

export function getThemeConfig(theme?: ColorTheme): ColorThemeConfig {
  if (theme && COLOR_THEMES[theme]) {
    return COLOR_THEMES[theme];
  }
  return COLOR_THEMES.blue;
}
