import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { SearchModal } from './components/layout/SearchModal';
import { HomeDashboard } from './components/views/HomeDashboard';
import { LessonReader } from './components/reader/LessonReader';
import { ToolsView } from './components/views/ToolsView';
import { ProjectLibrary } from './components/views/ProjectLibrary';
import { ResourceHub } from './components/views/ResourceHub';
import { GlossaryView } from './components/views/GlossaryView';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { getLessonById, allLessons } from './data/curriculum';

export function App() {
  const { theme, toggleTheme } = useTheme();

  const {
    completedLessons,
    bookmarkedLessons,
    lastVisitedLessonId,
    progressPercentage,
    isCompleted,
    isBookmarked,
    toggleComplete,
    toggleBookmark,
    setLastVisited,
    resetProgress,
    totalLessons
  } = useProgress();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>(lastVisitedLessonId || 'lesson-0-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Header Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [selectedDiffFilter, setSelectedDiffFilter] = useState('all');

  // Sync state with URL hash on load & hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('lesson-')) {
        const found = getLessonById(hash);
        if (found) {
          setActiveLessonId(hash);
          setActiveTab('reader');
          return;
        }
      }

      if (['home', 'reader', 'tools', 'projects', 'resources', 'glossary'].includes(hash)) {
        setActiveTab(hash as ActiveTab);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when tab or lesson changes
  const navigateToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setLastVisited(lessonId);
    setActiveTab('reader');
    window.history.replaceState(null, '', `#${lessonId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user types in header search while on another tab, switch to home to show filtered cards
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim() && activeTab !== 'home' && activeTab !== 'reader') {
      setActiveTab('home');
    }
  };

  const handleStageFilterChange = (stg: string) => {
    setSelectedStageFilter(stg);
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
  };

  const handleDiffFilterChange = (diff: string) => {
    setSelectedDiffFilter(diff);
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
  };

  // Global keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const currentLesson = getLessonById(activeLessonId) || allLessons[0];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] font-mono selection:bg-[var(--accent)] selection:text-white transition-colors duration-200">
      {/* 3-Tier Archival Header */}
      <Header
        activeTab={activeTab}
        onTabChange={navigateToTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearchModal={() => setSearchOpen(true)}
        progressPercentage={progressPercentage}
        completedCount={completedLessons.length}
        totalCount={totalLessons}
        onResetProgress={resetProgress}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStageFilter={selectedStageFilter}
        onStageFilterChange={handleStageFilterChange}
        selectedDiffFilter={selectedDiffFilter}
        onDiffFilterChange={handleDiffFilterChange}
      />

      <div className="flex-1 flex w-full">
        {/* Curriculum Sidebar (Shown on Reader tab, or when drawer is toggled open on mobile) */}
        {(activeTab === 'reader' || sidebarOpen) && (
          <Sidebar
            activeLessonId={activeLessonId}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            onSelectLesson={handleSelectLesson}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 transition-all duration-200 pb-20 md:pb-8">
          {activeTab === 'home' && (
            <HomeDashboard
              completedLessons={completedLessons}
              lastVisitedLessonId={lastVisitedLessonId}
              progressPercentage={progressPercentage}
              onSelectLesson={handleSelectLesson}
              onNavigateTab={navigateToTab}
              searchQuery={searchQuery}
              selectedStageFilter={selectedStageFilter}
              selectedDiffFilter={selectedDiffFilter}
            />
          )}

          {activeTab === 'reader' && (
            <LessonReader
              lesson={currentLesson}
              isCompleted={isCompleted(currentLesson.id)}
              isBookmarked={isBookmarked(currentLesson.id)}
              onToggleComplete={() => toggleComplete(currentLesson.id)}
              onToggleBookmark={() => toggleBookmark(currentLesson.id)}
              onNavigateLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'tools' && <ToolsView />}

          {activeTab === 'projects' && <ProjectLibrary />}

          {activeTab === 'resources' && <ResourceHub />}

          {activeTab === 'glossary' && <GlossaryView />}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
      />

      {/* Persistent Android Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={navigateToTab}
        onOpenSearch={() => setSearchOpen(true)}
        onToggleCurriculum={() => setSidebarOpen(true)}
        progressPercentage={progressPercentage}
        completedCount={completedLessons.length}
        totalCount={totalLessons}
        onResetProgress={resetProgress}
      />

      {/* Archival Lined Footer */}
      <footer className="mt-auto py-6 border-t-2 border-[var(--line)] bg-[var(--panel)] text-xs text-[var(--ink3)] hidden md:block no-print transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-bold text-[var(--ink)]">THE ARCHIVAL n8n HANDBOOK</span>
            <span>//</span>
            <span>ZERO TO PROFESSIONAL ARCHITECT</span>
          </div>
          <div className="flex items-center gap-4 text-[var(--ink2)]">
            <button onClick={() => navigateToTab('resources')} className="hover:text-[var(--ink)] transition-colors cursor-pointer">
              [ Downloads & Templates ]
            </button>
            <button onClick={() => navigateToTab('glossary')} className="hover:text-[var(--ink)] transition-colors cursor-pointer">
              [ Glossary ]
            </button>
            <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors">
              [ docs.n8n.io ↗ ]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
