import React, { useState, useEffect } from 'react';
import { ScribbleRing } from '../common/ScribbleRing';
import { 
  Sun, 
  Moon, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export type ActiveTab = 'home' | 'reader' | 'tools' | 'projects' | 'resources' | 'glossary';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  progressPercentage: number;
  completedCount: number;
  totalCount: number;
  onResetProgress: () => void;
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedStageFilter: string;
  onStageFilterChange: (stageId: string) => void;
  selectedDiffFilter: string;
  onDiffFilterChange: (diff: string) => void;
  onOpenSearchModal: () => void;
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'home', label: 'Dashboard' },
  { id: 'reader', label: 'Curriculum' },
  { id: 'tools', label: 'Visual Lab' },
  { id: 'projects', label: 'Projects' },
  { id: 'resources', label: 'Downloads' },
  { id: 'glossary', label: 'Glossary' },
];

const STAGE_OPTIONS = [
  { id: 'all', label: 'All Stages' },
  { id: 'stage-0', label: '0. Foundations' },
  { id: 'stage-1', label: '1. Core Logic' },
  { id: 'stage-2', label: '2. Routing' },
  { id: 'stage-3', label: '3. Webhooks & APIs' },
  { id: 'stage-4', label: '4. Databases' },
  { id: 'stage-5', label: '5. AI Agents' },
  { id: 'stage-6', label: '6. Production DevOps' },
  { id: 'stage-7', label: '7. Capstone' },
];

const DIFFICULTY_OPTIONS = [
  { id: 'all', label: 'All Levels' },
  { id: 'Beginner', label: 'Beginner' },
  { id: 'Intermediate', label: 'Intermediate' },
  { id: 'Advanced', label: 'Advanced' },
  { id: 'Enterprise', label: 'Enterprise' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  progressPercentage,
  completedCount,
  totalCount,
  onResetProgress,
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  selectedStageFilter,
  onStageFilterChange,
  selectedDiffFilter,
  onDiffFilterChange,
  onOpenSearchModal,
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Auto-close filter drawer when navigating
  useEffect(() => {
    setFilterDrawerOpen(false);
  }, [activeTab]);

  const activeFiltersCount = 
    (selectedStageFilter !== 'all' ? 1 : 0) + 
    (selectedDiffFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    onStageFilterChange('all');
    onDiffFilterChange('all');
    onSearchChange('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg)] text-[var(--ink)] font-mono select-none no-print transition-colors duration-200">
      {/* ─────────────────────────────────────────────────────────────
          ROW 1: TITLE & AUXILIARY CONTROLS (THEME, PROGRESS, RESET)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 text-xs">
        {/* Left: Brand title & archival catalog meta */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <button
            onClick={() => {
              if (activeTab !== 'reader') {
                onTabChange('reader');
              }
              onToggleSidebar();
            }}
            className="md:hidden p-1.5 rounded border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:bg-[var(--panel2)] transition-colors"
            title="Curriculum Index"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>

          <div 
            onClick={() => onTabChange('home')}
            className="cursor-pointer group flex items-baseline gap-2 truncate"
          >
            <span className="font-bold text-sm sm:text-base tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              The n8n Handbook
            </span>
            <span className="hidden md:inline text-[11px] text-[var(--ink3)]">
              [ ARCHIVAL CATALOGUE // 31 MODULES // VERIFIED v1.75+ ]
            </span>
          </div>
        </div>

        {/* Right: Theme switch, Progress counter, Reset button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Progress Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--line-subtle)] bg-[var(--panel)] text-[11px]">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span className="font-bold">{progressPercentage}%</span>
            <span className="hidden sm:inline text-[var(--ink3)]">({completedCount}/{totalCount})</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--panel2)] transition-colors text-[11px] font-bold cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">DARK</span>
              </>
            )}
          </button>

          {/* Reset progress (Desktop) */}
          <button
            onClick={() => {
              if (window.confirm('Reset all reading progress?')) {
                onResetProgress();
              }
            }}
            className="hidden lg:flex items-center gap-1 p-1.5 rounded text-[var(--ink3)] hover:text-rose-500 transition-colors"
            title="Reset All Progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Heavy 2px solid horizontal line */}
      <div className="w-full border-b-2 border-[var(--line)]" />

      {/* ─────────────────────────────────────────────────────────────
          ROW 2: INLINE TEXTUAL SUBNAV WITH COMMAS & SCRIBBLE RING
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between text-xs overflow-x-auto no-scrollbar">
        <nav className="flex items-center flex-nowrap shrink-0 text-xs sm:text-[13px]">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeTab === item.id;
            const isLast = index === NAV_ITEMS.length - 1;

            return (
              <span key={item.id} className="inline-flex items-center whitespace-nowrap">
                <button
                  id={`nav-btn-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`relative py-1 px-1.5 cursor-pointer transition-colors duration-150 ${
                    isActive 
                      ? 'font-bold text-[var(--ink)]' 
                      : 'text-[var(--ink2)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <ScribbleRing 
                      className="absolute inset-0" 
                      color={theme === 'dark' ? '#f1f3f7' : '#111111'} 
                    />
                  )}
                </button>
                {!isLast && (
                  <span className="text-[var(--ink3)] mr-2 select-none">,</span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-[var(--ink3)] shrink-0 pl-4">
          <span>ZERO-TO-ARCHITECT</span>
          <span>•</span>
          <span>ENTERPRISE SPEC</span>
        </div>
      </div>

      {/* Heavy 2px solid horizontal line (shows only if row 3 is rendered) */}
      <div className={`w-full border-b-2 border-[var(--line)] ${activeTab === 'home' ? 'block' : 'hidden sm:block'}`} />

      {/* ─────────────────────────────────────────────────────────────
          ROW 3: FULL-WIDTH ARCHIVAL SEARCH BAR & FILTERS BUTTON
          (Always visible on Desktop; on Mobile only on Dashboard to maximize reading space)
          ───────────────────────────────────────────────────────────── */}
      <div className={`w-full px-3 sm:px-6 py-2 items-center gap-3 ${activeTab === 'home' ? 'flex' : 'hidden sm:flex'}`}>
        {/* Search input container with terminal caret effect */}
        <div className="flex-1 relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[var(--ink3)] absolute left-1 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Q Titles, nodes, JavaScript code, webhook blueprints..."
            className="w-full pl-7 pr-4 py-1 bg-transparent text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none tracking-tight font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
              title="Clear Search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global modal trigger shortcut */}
        <button
          onClick={onOpenSearchModal}
          className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--line-subtle)] text-[10px] text-[var(--ink3)] hover:text-[var(--ink)] hover:border-[var(--line)] transition-colors"
          title="Open Modal Search"
        >
          <span>MODAL</span>
          <kbd className="font-mono text-[9px] bg-[var(--panel2)] px-1 rounded">/</kbd>
        </button>

        {/* Filters Toggle Accordion Button */}
        <button
          id="filters-toggle-btn"
          onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors ${
            filterDrawerOpen || activeFiltersCount > 0
              ? 'border-[var(--line)] bg-[var(--panel2)] text-[var(--ink)] font-bold'
              : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
          {filterDrawerOpen ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EXPANDABLE FILTER DRAWER (CSS GRID ACCORDION)
          ───────────────────────────────────────────────────────────── */}
      <div className={`fpop-drawer ${filterDrawerOpen ? 'open' : ''} bg-[var(--panel)] border-t border-[var(--line-subtle)] ${activeTab === 'home' ? '' : 'hidden sm:grid'}`}>
        <div className="fpop-inner px-3 sm:px-6 py-4 space-y-3.5">
          {/* Stage Pills */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)]">
                // Filter by Curriculum Stage
              </span>
              {(activeFiltersCount > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STAGE_OPTIONS.map((stg) => {
                const isSelected = selectedStageFilter === stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => onStageFilterChange(stg.id)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold'
                        : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {stg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Pills */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block mb-1.5">
              // Filter by Difficulty Tier
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTY_OPTIONS.map((diff) => {
                const isSelected = selectedDiffFilter === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => onDiffFilterChange(diff.id)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold'
                        : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {diff.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Heavy 2px solid horizontal line ending the header */}
      <div className="w-full border-b-2 border-[var(--line)]" />
    </header>
  );
};
