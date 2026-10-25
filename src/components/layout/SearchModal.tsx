import React, { useState, useEffect } from 'react';
import { allLessons, searchCurriculum } from '../../data/curriculum';
import { Lesson } from '../../types/curriculum';
import { Search, X, Clock } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Lesson[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchCurriculum(query));
    } else {
      setResults(allLessons.slice(0, 6));
    }
  }, [query]);

  // Keyboard shortcut listener ('/' opens search, 'Esc' closes)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm font-mono">
      <div 
        className="w-full max-w-2xl bg-[var(--bg)] border-2 border-[var(--line)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-[var(--ink)]"
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b-2 border-[var(--line)] flex items-center gap-3">
          <Search className="w-4 h-4 text-[var(--ink3)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Q Search concepts, nodes, expressions, Docker, AI, webhooks..."
            autoFocus
            className="w-full bg-transparent text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded border border-[var(--line-subtle)] text-[var(--ink2)] hover:text-[var(--ink)] hover:border-[var(--line)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] px-1 pb-1">
            // {query.trim() ? `ARCHIVE SEARCH RESULTS (${results.length})` : 'RECOMMENDED ARCHIVE CHAPTERS'}
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-[var(--ink3)] text-xs">
              No matching curriculum lessons found for "{query}". Try searching for 'Docker', 'OAuth', 'JSON', 'Agent', or 'SQL'.
            </div>
          ) : (
            results.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] transition-all flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--line-subtle)] text-[var(--ink2)]">
                      {lesson.difficulty}
                    </span>
                    <span className="text-xs text-[var(--ink3)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.estimatedMinutes}m
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-[var(--ink2)] line-clamp-1 italic">
                    {lesson.subtitle}
                  </p>
                </div>

                <span className="text-xs font-bold text-[var(--ink3)] group-hover:text-[var(--ink)] shrink-0 pt-2">
                  [ READ ↗ ]
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
