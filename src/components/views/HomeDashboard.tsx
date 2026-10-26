import React from 'react';
import { stages, allLessons, getLessonById, searchCurriculum } from '../../data/curriculum';
import { Stage, Lesson } from '../../types/curriculum';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FolderGit2, 
  Wrench, 
  Download,
  HelpCircle,
  Sparkles,
  Layers,
  Search
} from 'lucide-react';

interface HomeDashboardProps {
  completedLessons: string[];
  lastVisitedLessonId: string;
  progressPercentage: number;
  onSelectLesson: (lessonId: string) => void;
  onNavigateTab: (tab: 'reader' | 'tools' | 'projects' | 'resources' | 'glossary') => void;
  searchQuery?: string;
  selectedStageFilter?: string;
  selectedDiffFilter?: string;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  completedLessons,
  lastVisitedLessonId,
  progressPercentage,
  onSelectLesson,
  onNavigateTab,
  searchQuery = '',
  selectedStageFilter = 'all',
  selectedDiffFilter = 'all',
}) => {
  const currentLesson: Lesson = getLessonById(lastVisitedLessonId) || allLessons[0];
  const totalDurationMinutes = stages.reduce(
    (acc, stage) => acc + stage.modules.reduce((mAcc, m) => mAcc + m.estimatedMinutes, 0),
    0
  );

  // Filter lessons if search query or filters are active
  const hasActiveFilters = Boolean(
    searchQuery.trim() || 
    selectedStageFilter !== 'all' || 
    selectedDiffFilter !== 'all'
  );

  let filteredLessons = allLessons;
  if (searchQuery.trim()) {
    filteredLessons = searchCurriculum(searchQuery);
  }
  if (selectedStageFilter !== 'all') {
    filteredLessons = filteredLessons.filter(l => l.stageId === selectedStageFilter);
  }
  if (selectedDiffFilter !== 'all') {
    filteredLessons = filteredLessons.filter(l => l.difficulty === selectedDiffFilter);
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-8 font-mono">
      {/* ─────────────────────────────────────────────────────────────
          1. ARCHIVAL CATALOGUE STATS BAR
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full border border-[var(--line-subtle)] bg-[var(--panel)] p-3 sm:p-4 rounded-xl text-xs flex flex-wrap items-center justify-between gap-3 text-[var(--ink2)]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-medium">
          <span className="text-[var(--ink)] font-bold">// ARCHIVAL CATALOGUE:</span>
          <span>[ 31 MODULES ]</span>
          <span>[ 8 STAGES ]</span>
          <span>[ ~{Math.round(totalDurationMinutes / 60)}H TOTAL TIME ]</span>
          <span>[ N8N v1.75+ COMPATIBLE ]</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--ink)]">PROGRESS:</span>
          <span className="px-2 py-0.5 rounded bg-[var(--panel2)] text-[var(--ink)] border border-[var(--line-subtle)] font-bold">
            {progressPercentage}%
          </span>
          <span className="text-[11px] text-[var(--ink3)]">
            ({completedLessons.length}/{allLessons.length} read)
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FILTERED RESULTS VIEW (IF ACTIVE)
          ───────────────────────────────────────────────────────────── */}
      {hasActiveFilters ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line-subtle)]">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[var(--accent)]" />
              <h2 className="text-sm sm:text-base font-bold text-[var(--ink)]">
                FILTERED ARCHIVE RESULTS ({filteredLessons.length})
              </h2>
            </div>
            <span className="text-xs text-[var(--ink3)]">
              Showing matching modules
            </span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="border-2 border-dashed border-[var(--line-subtle)] p-12 text-center rounded-2xl space-y-3">
              <p className="text-sm text-[var(--ink2)]">
                No archived lessons found matching your filters.
              </p>
              <p className="text-xs text-[var(--ink3)]">
                Try searching for terms like "Docker", "JSON", "Webhook", "PostgreSQL", or "Agent".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson) => {
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className="archival-card p-5 flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-[var(--ink3)]">
                        <span className="border border-[var(--line-subtle)] px-1.5 py-0.5 rounded uppercase font-bold text-[var(--ink2)]">
                          {lesson.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedMinutes}m
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-[var(--ink2)] leading-relaxed line-clamp-2 italic">
                        {lesson.subtitle}
                      </p>

                      <div className="text-[11px] text-[var(--ink3)]">
                        <span>o--o {lesson.keyTakeaways?.length || 4} connected nodes</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs">
                      <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--line-subtle)] text-[var(--ink2)]">
                        [ {lesson.difficulty} ]
                      </span>

                      <span className="flex items-center gap-1 font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                        <span>{isDone ? '[ COMPLETED ✓ ]' : '[ READ MODULE → ]'}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────────
              2.5. ABSOLUTE BEGINNER PATHWAY (START HERE)
              ───────────────────────────────────────────────────────────── */}
          <section className="archival-card p-5 sm:p-7 border-2 border-emerald-500/50 bg-[var(--panel)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--line-subtle)] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-emerald-500">// START HERE: THE ABSOLUTE BEGINNER PATHWAY</span>
              </div>
              <span className="text-[11px] text-[var(--ink3)]">
                NO PRIOR CODING EXPERIENCE REQUIRED
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] leading-snug">
                Learn n8n from the very beginning, step by step
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink2)] leading-relaxed max-w-3xl">
                You do not need to know what a variable, database, or API is. We guide you through everyday analogies, simple diagrams, and gentle hands-on workflows so you understand precisely how each piece works.
              </p>

              {/* 4-Step Beginner Journey Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div 
                  onClick={() => onSelectLesson('lesson-0-1')}
                  className="p-3.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="text-[10px] font-bold text-emerald-500 uppercase">
                    Step 1 • Orientation
                  </div>
                  <div className="text-xs font-bold text-[var(--ink)]">
                    What is Automation?
                  </div>
                  <div className="text-[11px] text-[var(--ink2)] leading-relaxed">
                    How everyday tasks (like brewing tea) become digital workflows.
                  </div>
                </div>

                <div 
                  onClick={() => onSelectLesson('lesson-0-2')}
                  className="p-3.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="text-[10px] font-bold text-blue-500 uppercase">
                    Step 2 • Setup
                  </div>
                  <div className="text-xs font-bold text-[var(--ink)]">
                    Easy Browser Setup
                  </div>
                  <div className="text-[11px] text-[var(--ink2)] leading-relaxed">
                    Open n8n in 60 seconds with zero installation or terminal tools.
                  </div>
                </div>

                <div 
                  onClick={() => onSelectLesson('lesson-0-3')}
                  className="p-3.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="text-[10px] font-bold text-[var(--accent)] uppercase">
                    Step 3 • Hands-on Lab
                  </div>
                  <div className="text-xs font-bold text-[var(--ink)]">
                    Your First Message
                  </div>
                  <div className="text-[11px] text-[var(--ink2)] leading-relaxed">
                    Connect 3 simple blocks: Manual Start ──► Set Message ──► See Result.
                  </div>
                </div>

                <div 
                  onClick={() => onSelectLesson('lesson-2-1')}
                  className="p-3.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] cursor-pointer transition-all space-y-1.5"
                >
                  <div className="text-[10px] font-bold text-purple-400 uppercase">
                    Step 4 • Mechanics
                  </div>
                  <div className="text-xs font-bold text-[var(--ink)]">
                    Understand the Canvas
                  </div>
                  <div className="text-[11px] text-[var(--ink2)] leading-relaxed">
                    See how input pins, output pins, and green checkmarks work.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[var(--line-subtle)]">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--ink2)]">
                <span className="flex items-center gap-1 text-emerald-500 font-bold">
                  ✓ ZERO CODE NEEDED
                </span>
                <span className="text-[var(--ink3)]">•</span>
                <span className="flex items-center gap-1 font-bold">
                  ✓ 3-LEVEL EXPLANATIONS
                </span>
                <span className="text-[var(--ink3)]">•</span>
                <span className="flex items-center gap-1 font-bold">
                  ✓ INTERACTIVE LABS
                </span>
              </div>

              <button
                onClick={() => onSelectLesson('lesson-0-1')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START YOUR FIRST LESSON (NO CODING REQUIRED)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────
              3. FEATURED / RECOMMENDED NEXT LESSON (ARCHIVAL HERO)
              ───────────────────────────────────────────────────────────── */}
          <section className="archival-card p-5 sm:p-7 border-2 border-[var(--line)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--line-subtle)] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-bold text-[var(--ink)]">// RECOMMENDED CURRENT MODULE</span>
              </div>
              <span className="text-[var(--ink3)]">ID: {currentLesson.id}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded border border-[var(--line-subtle)] text-[10px] font-bold text-[var(--ink2)]">
                  [ {currentLesson.difficulty.toUpperCase()} ]
                </span>
                <span className="text-xs text-[var(--ink3)] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{currentLesson.estimatedMinutes} MINUTES
                </span>
                <span className="text-xs text-[var(--ink3)]">
                  o--o 5 CONNECTED ARCHITECTURE NODES
                </span>
              </div>

              <h2 
                onClick={() => onSelectLesson(currentLesson.id)}
                className="text-lg sm:text-2xl font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer leading-tight"
              >
                {currentLesson.title}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--ink2)] leading-relaxed italic max-w-3xl">
                {currentLesson.subtitle}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onSelectLesson(currentLesson.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded border-2 border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>CONTINUE STUDYING: {currentLesson.title.split(' ')[0]} {currentLesson.title.split(' ')[1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateTab('projects')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] font-bold text-xs hover:border-[var(--line)] transition-all cursor-pointer"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-purple-500" />
                <span>[ BROWSE 20+ PRODUCTION PROJECTS ]</span>
              </button>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────
              4. THE 8 CURRICULUM STAGES (ARCHIVAL GRID)
              ───────────────────────────────────────────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--line)]">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight">
                  // COMPLETE CURRICULUM ARCHIVE (8 STAGES)
                </h2>
                <p className="text-xs text-[var(--ink3)]">
                  Systematic progression from zero fundamentals to enterprise workflow orchestrator
                </p>
              </div>
              <span className="hidden sm:inline text-xs text-[var(--ink3)]">
                SELECT A MODULE TO BEGIN
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {stages.map((stage: Stage, stageIndex: number) => {
                const stageLessons = stage.modules.flatMap(m => m.lessons);
                const stageCompleted = stageLessons.filter(l => completedLessons.includes(l.id)).length;
                const isStageDone = stageCompleted === stageLessons.length && stageLessons.length > 0;
                const stageMinutes = stage.modules.reduce((acc, m) => acc + m.estimatedMinutes, 0);

                return (
                  <div
                    key={stage.id}
                    className="archival-card p-5 sm:p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Stage Index Header */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold border border-[var(--line-subtle)] px-2 py-0.5 rounded text-[11px] text-[var(--ink)] bg-[var(--panel2)]">
                          [ STAGE {String(stageIndex).padStart(2, '0')} ]
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-[var(--ink3)]">
                          <span>o--o {stage.modules.length} MODULES</span>
                          <span>•</span>
                          <span>~{stageMinutes}m</span>
                        </div>
                      </div>

                      {/* Stage Title */}
                      <h3 className="text-base font-bold text-[var(--ink)] leading-snug">
                        {stage.title}
                      </h3>

                      <p className="text-xs text-[var(--ink2)] leading-relaxed italic">
                        {stage.description}
                      </p>

                      {/* Modules list preview inside card */}
                      <div className="pt-2 space-y-1.5 border-t border-[var(--line-subtle)]">
                        <span className="text-[10px] font-bold text-[var(--ink3)] block uppercase">
                          ARCHIVE LESSONS:
                        </span>
                        {stageLessons.map((l) => {
                          const done = completedLessons.includes(l.id);
                          return (
                            <div
                              key={l.id}
                              onClick={() => onSelectLesson(l.id)}
                              className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-[var(--panel2)] cursor-pointer text-[var(--ink2)] hover:text-[var(--ink)] transition-colors group/item"
                            >
                              <span className="truncate pr-2 group-hover/item:text-[var(--accent)]">
                                {done ? '[✓] ' : '[ ] '} {l.title}
                              </span>
                              <span className="text-[10px] text-[var(--ink3)] shrink-0 font-mono">
                                {l.estimatedMinutes}m ↗
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stage Card Footer */}
                    <div className="pt-3 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[11px] text-[var(--ink3)]">
                        {isStageDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <span className="w-2 h-2 rounded-full border border-[var(--ink3)]" />
                        )}
                        <span>{stageCompleted} / {stageLessons.length} completed</span>
                      </div>

                      <button
                        onClick={() => {
                          if (stageLessons[0]) {
                            onSelectLesson(stageLessons[0].id);
                          }
                        }}
                        className="font-bold text-xs text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                      >
                        [ Open Stage ↗ ]
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────
              5. QUICK ARCHIVE JUMP TILES
              ───────────────────────────────────────────────────────────── */}
          <section className="pt-4 border-t-2 border-[var(--line)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <button
              onClick={() => onNavigateTab('tools')}
              className="archival-card p-4 text-left space-y-1 hover:border-[var(--line)] cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-blue-500 font-bold">
                <Wrench className="w-3.5 h-3.5" />
                <span>[ Visual Lab ]</span>
              </div>
              <p className="text-[11px] text-[var(--ink3)]">4 Interactive Diagnostic Tools</p>
            </button>

            <button
              onClick={() => onNavigateTab('projects')}
              className="archival-card p-4 text-left space-y-1 hover:border-[var(--line)] cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-purple-500 font-bold">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>[ Projects ]</span>
              </div>
              <p className="text-[11px] text-[var(--ink3)]">20+ Graded Real Workflows</p>
            </button>

            <button
              onClick={() => onNavigateTab('resources')}
              className="archival-card p-4 text-left space-y-1 hover:border-[var(--line)] cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                <Download className="w-3.5 h-3.5" />
                <span>[ Downloads ]</span>
              </div>
              <p className="text-[11px] text-[var(--ink3)]">JSONs, SOWs & Checklists</p>
            </button>

            <button
              onClick={() => onNavigateTab('glossary')}
              className="archival-card p-4 text-left space-y-1 hover:border-[var(--line)] cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>[ Glossary ]</span>
              </div>
              <p className="text-[11px] text-[var(--ink3)]">60+ Terms Defined</p>
            </button>
          </section>
        </>
      )}
    </div>
  );
};
