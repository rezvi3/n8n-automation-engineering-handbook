import React, { useState } from 'react';
import { stages } from '../../data/curriculum';
import { Stage, Module, Lesson } from '../../types/curriculum';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Search, 
  X,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  activeLessonId: string;
  completedLessons: string[];
  bookmarkedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeLessonId,
  completedLessons,
  bookmarkedLessons,
  onSelectLesson,
  isOpen,
  onClose
}) => {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-0': true,
    'stage-1': true,
    'stage-2': true,
    'stage-3': true
  });
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarks' | 'completed'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--ink)] font-mono text-xs select-none">
      {/* Top: Filter & Search header */}
      <div className="p-3 sm:p-4 border-b-2 border-[var(--line)] space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>// CURRICULUM ARCHIVE</span>
          </span>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 rounded border border-[var(--line-subtle)] text-[var(--ink2)] hover:text-[var(--ink)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search within curriculum */}
        <div className="relative">
          <Search className="w-3 h-3 text-[var(--ink3)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter archive..."
            className="w-full pl-7 pr-3 py-1 text-xs rounded border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none focus:border-[var(--line)]"
          />
        </div>

        {/* Quick filter tabs */}
        <div className="flex rounded border border-[var(--line-subtle)] bg-[var(--panel)] p-0.5 text-[11px]">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 py-1 rounded text-center transition-colors cursor-pointer ${
              filterMode === 'all' 
                ? 'bg-[var(--line)] text-[var(--bg)] font-bold' 
                : 'text-[var(--ink2)] hover:text-[var(--ink)]'
            }`}
          >
            All (31)
          </button>
          <button
            onClick={() => setFilterMode('completed')}
            className={`flex-1 py-1 rounded text-center transition-colors cursor-pointer ${
              filterMode === 'completed' 
                ? 'bg-emerald-600 text-white font-bold' 
                : 'text-[var(--ink2)] hover:text-[var(--ink)]'
            }`}
          >
            Done ({completedLessons.length})
          </button>
          <button
            onClick={() => setFilterMode('bookmarks')}
            className={`flex-1 py-1 rounded text-center transition-colors cursor-pointer ${
              filterMode === 'bookmarks' 
                ? 'bg-amber-500 text-white font-bold' 
                : 'text-[var(--ink2)] hover:text-[var(--ink)]'
            }`}
          >
            Saved ({bookmarkedLessons.length})
          </button>
        </div>
      </div>

      {/* Scrollable Stage & Lesson Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {stages.map((stage: Stage, stageIndex: number) => {
          const isExpanded = expandedStages[stage.id] ?? false;

          // Filter lessons according to search and mode
          const filteredModules = stage.modules.map(m => {
            const matchingLessons = m.lessons.filter(l => {
              if (filterMode === 'completed' && !completedLessons.includes(l.id)) return false;
              if (filterMode === 'bookmarks' && !bookmarkedLessons.includes(l.id)) return false;
              if (localSearch.trim()) {
                const q = localSearch.toLowerCase();
                return l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q) || l.id.toLowerCase().includes(q);
              }
              return true;
            });
            return { ...m, lessons: matchingLessons };
          }).filter(m => m.lessons.length > 0);

          if (filteredModules.length === 0 && (filterMode !== 'all' || localSearch.trim())) {
            return null;
          }

          const stageLessonsCount = stage.modules.flatMap(m => m.lessons).length;
          const stageDoneCount = stage.modules.flatMap(m => m.lessons).filter(l => completedLessons.includes(l.id)).length;

          return (
            <div key={stage.id} className="border border-[var(--line-subtle)] rounded-lg bg-[var(--panel)] overflow-hidden">
              {/* Stage Collapsible Toggle */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full p-2.5 flex items-center justify-between text-left hover:bg-[var(--panel2)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--ink3)] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--ink3)] shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="text-[10px] text-[var(--ink3)] block">
                      STAGE {String(stageIndex).padStart(2, '0')}
                    </span>
                    <span className="font-bold text-[var(--ink)] truncate block text-xs">
                      {stage.title.replace(/^Stage \d+:\s*/, '')}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-[var(--ink3)] shrink-0">
                  {stageDoneCount}/{stageLessonsCount}
                </span>
              </button>

              {/* Modules & Lessons */}
              {isExpanded && (
                <div className="p-1 space-y-1 border-t border-[var(--line-subtle)] bg-[var(--bg)]">
                  {filteredModules.map((mod: Module) => (
                    <div key={mod.id} className="space-y-0.5">
                      <div className="px-2 pt-1.5 pb-0.5 text-[10px] font-bold text-[var(--ink3)] uppercase">
                        // M{mod.number}: {mod.title}
                      </div>

                      {mod.lessons.map((lesson: Lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessons.includes(lesson.id);
                        const isSaved = bookmarkedLessons.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              onSelectLesson(lesson.id);
                              onClose();
                            }}
                            className={`w-full text-left p-1.5 rounded transition-all flex items-center justify-between gap-2 cursor-pointer ${
                              isActive
                                ? 'bg-[var(--line)] text-[var(--bg)] font-bold'
                                : 'text-[var(--ink2)] hover:text-[var(--ink)] hover:bg-[var(--panel2)]'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="shrink-0 text-[10px]">
                                {isDone ? '✓' : '·'}
                              </span>
                              <span className="truncate text-xs">
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 text-[10px]">
                              {isSaved && <span className="text-amber-500">★</span>}
                              <span className={isActive ? 'opacity-80' : 'text-[var(--ink3)]'}>
                                {lesson.estimatedMinutes}m
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed left) */}
      <aside className="hidden lg:block w-72 shrink-0 border-r-2 border-[var(--line)] h-[calc(100vh-120px)] sticky top-[120px] overflow-hidden no-print">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (When sidebarOpen is true) */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-80 max-w-[85vw] h-full bg-[var(--bg)] border-r-2 border-[var(--line)] shadow-2xl flex flex-col animate-in slide-in-from-left duration-200"
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
