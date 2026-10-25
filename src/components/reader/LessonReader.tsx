import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '../../types/curriculum';
import { getAdjacentLessons, getModuleById, getStageById } from '../../data/curriculum';
import { MermaidDiagram } from './MermaidDiagram';
import { JsonInspector } from './JsonInspector';
import { Callout } from './Callout';
import { QuizCard } from './QuizCard';
import { ExerciseLab } from './ExerciseLab';
import { ScribbleRing } from '../common/ScribbleRing';
import { useNotes } from '../../hooks/useNotes';
import { 
  CheckCircle2, 
  Bookmark, 
  Printer, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  FileText, 
  Layers,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Check,
  ShieldAlert,
  Compass
} from 'lucide-react';

interface LessonReaderProps {
  lesson: Lesson;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: () => void;
  onToggleBookmark: () => void;
  onNavigateLesson: (lessonId: string) => void;
}

const SECTION_NAV_ITEMS = [
  { id: 'section-problem', label: 'Problem' },
  { id: 'section-concept', label: 'Principles' },
  { id: 'section-importance', label: 'Why It Matters' },
  { id: 'section-architecture', label: 'Architecture' },
  { id: 'section-parameters', label: 'Parameters' },
  { id: 'section-example', label: 'Worked Example' },
  { id: 'section-lab', label: 'Lab' },
  { id: 'section-edge-cases', label: 'Traps' },
  { id: 'section-quiz', label: 'Quiz' },
  { id: 'section-challenge', label: 'Challenge' },
  { id: 'section-takeaways', label: 'Takeaways' },
  { id: 'section-references', label: 'Docs' }
];

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onNavigateLesson
}) => {
  const { prevLesson, nextLesson } = getAdjacentLessons(lesson.id);
  const currentModule = getModuleById(lesson.moduleId);
  const currentStage = getStageById(lesson.stageId);
  const { note, saveNote } = useNotes(lesson.id);
  const [showNotes, setShowNotes] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('section-problem');
  const [scrollProgress, setScrollProgress] = useState(0);

  const articleRef = useRef<HTMLElement>(null);

  // Track scroll progress & active section
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;

      const totalHeight = el.clientHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY - el.offsetTop + 100;
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Check which section is in view
      const scrollPosition = window.scrollY + 180;
      for (let i = SECTION_NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = SECTION_NAV_ITEMS[i];
        const sectionEl = document.getElementById(item.id);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lesson.id]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article ref={articleRef} className="font-mono min-h-screen pb-28 md:pb-16 text-[var(--ink)]">
      {/* 1. Dynamic Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent no-print pointer-events-none">
        <div 
          className="h-full bg-[var(--accent)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Archival Sticky Section Navigation (Inline with Commas & Scribble Ring) */}
      <nav 
        aria-label="Chapter Section Navigation"
        className="sticky top-0 z-20 bg-[var(--bg)]/95 backdrop-blur-md border-b-2 border-[var(--line)] px-3 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar flex items-center justify-between no-print transition-colors duration-200 select-none"
      >
        <div className="flex items-center flex-nowrap text-xs">
          <span className="text-[11px] font-bold text-[var(--ink3)] uppercase mr-2.5 shrink-0 hidden sm:inline">
            // SECTIONS:
          </span>
          {SECTION_NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            const isLast = index === SECTION_NAV_ITEMS.length - 1;

            return (
              <span key={item.id} className="inline-flex items-center whitespace-nowrap">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 px-1.5 cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'font-bold text-[var(--ink)]'
                      : 'text-[var(--ink2)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <ScribbleRing className="absolute inset-0" />
                  )}
                </button>
                {!isLast && (
                  <span className="text-[var(--ink3)] mr-2 select-none">,</span>
                )}
              </span>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-[var(--ink3)] shrink-0 pl-3">
          <span>{Math.round(scrollProgress)}% READ</span>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Archival Metadata */}
        <header className="pb-6 border-b-2 border-[var(--line)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Breadcrumb archival tags */}
            <div className="flex flex-wrap items-center gap-2 text-[var(--ink2)]">
              <span className="px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] font-bold text-[var(--ink)]">
                [ {currentStage?.badge || 'STAGE'} ]
              </span>
              <span>//</span>
              <span className="text-[var(--ink2)]">
                MODULE {currentModule?.number}: {currentModule?.title}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={onToggleBookmark}
                className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-bold transition-colors cursor-pointer ${
                  isBookmarked 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                    : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                }`}
                title="Bookmark this chapter"
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">{isBookmarked ? '[ SAVED ★ ]' : '[ BOOKMARK ]'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] text-[var(--ink2)] hover:text-[var(--ink)] text-xs font-bold transition-colors cursor-pointer"
                title="Print or Save Chapter as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>[ PRINT ]</span>
              </button>

              <button
                onClick={onToggleComplete}
                className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-bold transition-all cursor-pointer ${
                  isCompleted 
                    ? 'border-emerald-600 bg-emerald-600 text-white' 
                    : 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] hover:opacity-90'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCompleted ? '[ COMPLETED ✓ ]' : '[ MARK COMPLETE ]'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-tight leading-snug">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-base text-[var(--ink2)] leading-relaxed italic">
            {lesson.subtitle}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs pt-1 text-[var(--ink2)]">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)]">
              <Clock className="w-3 h-3 text-[var(--accent)]" />
              ~{lesson.estimatedMinutes} MINS
            </span>
            <span className="px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] font-bold">
              [ {lesson.difficulty.toUpperCase()} TIER ]
            </span>
            <span className="text-[11px] text-[var(--ink3)]">
              PREREQUISITES: {lesson.prerequisites.join(', ')}
            </span>
          </div>
        </header>

        {/* Section 1: The Relatable Business Problem */}
        <section id="section-problem" className="scroll-mt-24 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 01. THE REAL-WORLD BUSINESS PROBLEM
            </h2>
            <span className="text-[10px] text-[var(--ink3)]">[ SCENARIO ]</span>
          </div>
          <div className="p-4 sm:p-5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] leading-relaxed text-xs sm:text-sm">
            {lesson.relatableProblem}
          </div>
        </section>

        {/* Section 2: First Principles Concept Explanation */}
        <section id="section-concept" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 02. FIRST PRINCIPLES CONCEPT EXPLANATION
            </h2>
            <span className="text-[10px] text-[var(--ink3)]">[ THEORY & MECHANICS ]</span>
          </div>
          <div className="text-[var(--ink)] text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
            {lesson.firstPrinciplesExplanation}
          </div>
        </section>

        {/* Section 3: Why This Technique Matters */}
        <section id="section-importance" className="scroll-mt-24">
          <Callout type="tip" title="// 03. WHY THIS TECHNIQUE MATTERS IN ENTERPRISE PRODUCTION">
            {lesson.whyItMatters}
          </Callout>
        </section>

        {/* Section 4: Visual Architecture & Data Flow */}
        <section id="section-architecture" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 04. ARCHITECTURAL TOPOLOGY & DATA FLOW
            </h2>
            <span className="text-[10px] text-[var(--ink3)]">[ MERMAID & JSON ]</span>
          </div>
          {lesson.visualExplanation.mermaidCode && (
            <MermaidDiagram 
              chart={lesson.visualExplanation.mermaidCode} 
              caption={lesson.visualExplanation.caption} 
            />
          )}
          {lesson.visualExplanation.beforeAfter && (
            <JsonInspector 
              beforeTitle={lesson.visualExplanation.beforeAfter.beforeTitle}
              beforeData={lesson.visualExplanation.beforeAfter.beforeData}
              afterTitle={lesson.visualExplanation.beforeAfter.afterTitle}
              afterData={lesson.visualExplanation.beforeAfter.afterData}
            />
          )}
          {lesson.secondaryVisual?.mermaidCode && (
            <MermaidDiagram 
              chart={lesson.secondaryVisual.mermaidCode} 
              caption={lesson.secondaryVisual.caption} 
            />
          )}
        </section>

        {/* Section 5: Technical Details & Parameters */}
        <section id="section-parameters" className="scroll-mt-24 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 05. CONFIGURATION PARAMETERS & NODE SETTINGS
            </h2>
            <span className="text-[10px] text-[var(--ink3)]">[ SPECIFICATION ]</span>
          </div>
          <div className="p-4 sm:p-5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {lesson.technicalDetails}
          </div>
        </section>

        {/* Section 6: Worked Example with Real Data */}
        <section id="section-example" className="scroll-mt-24 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 06. WORKED EXAMPLE WITH SAMPLE DATA
            </h2>
            <span className="text-[10px] text-[var(--ink3)]">[ WALKTHROUGH ]</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel2)] text-xs text-[var(--ink)]">
            <span className="font-bold">// SCENARIO: </span>
            {lesson.workedExample.scenario}
          </div>
          <JsonInspector
            beforeTitle="Incoming Raw Input Payload"
            beforeData={lesson.workedExample.inputJson}
            afterTitle="Resulting Output Record"
            afterData={lesson.workedExample.outputJson}
            explanation={lesson.workedExample.explanation}
          />
        </section>

        {/* Section 7: Hands-on Construction Lab */}
        <section id="section-lab" className="scroll-mt-24">
          <ExerciseLab lab={lesson.stepByStepLab} />
        </section>

        {/* Section 8: Common Mistakes & Edge Cases */}
        <section id="section-edge-cases" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 08. COMMON MISTAKES, TRAPS & DEBUGGING MATRIX
            </h2>
            <span className="text-[10px] text-rose-500 font-bold">[ CRITICAL ]</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-rose-500 font-bold">
                  <span>[ TRAP #{idx + 1} ]:</span>
                  <span>{m.mistake}</span>
                </div>
                <p className="text-[var(--ink2)]">
                  <strong className="text-[var(--ink)]">Consequence: </strong>{m.consequence}
                </p>
                <div className="p-3 rounded-lg bg-[var(--panel2)] border border-[var(--line-subtle)] text-[var(--ink)]">
                  <strong className="text-emerald-500">// THE PRODUCTION FIX: </strong>{m.correction}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Knowledge Verification Quiz */}
        <section id="section-quiz" className="scroll-mt-24 no-print">
          <QuizCard questions={lesson.knowledgeCheck} />
        </section>

        {/* Section 10: Practical Challenge */}
        <section id="section-challenge" className="scroll-mt-24">
          <div className="p-5 sm:p-6 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line-subtle)]">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)] uppercase">
                // 10. INDEPENDENT ARCHITECTURAL CHALLENGE
              </h3>
              <span className="text-[10px] text-[var(--ink3)]">[ LAB DRILL ]</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
              {lesson.practicalChallenge.prompt}
            </p>
            <div className="space-y-2 text-xs">
              {lesson.practicalChallenge.hints.map((hint, i) => (
                <div key={i} className="p-2.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink2)]">
                  <span className="font-bold text-[var(--ink)] mr-1.5">// HINT #{i + 1}:</span>
                  {hint}
                </div>
              ))}
              <div className="mt-3 p-3 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)] text-xs">
                <span className="font-bold block mb-1 text-[var(--accent)]">// ARCHITECT SOLUTION BLUEPRINT:</span>
                {lesson.practicalChallenge.solutionNotes}
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Personal Study Notes */}
        <section className="scroll-mt-24 no-print">
          <div className="p-4 sm:p-5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="font-bold text-[var(--ink)] flex items-center gap-2 cursor-pointer text-xs sm:text-sm hover:text-[var(--accent)] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>// PERSONAL ARCHIVE NOTES {note && '[ RECORDED ✓ ]'}</span>
                <span className="text-[11px] text-[var(--ink3)]">{showNotes ? '(HIDE)' : '(SHOW / EDIT)'}</span>
              </button>
            </div>
            {showNotes && (
              <div className="space-y-2">
                <textarea
                  value={note}
                  onChange={(e) => saveNote(e.target.value)}
                  placeholder="Record your architectural observations, edge case findings, or personal tips for this chapter (auto-saved locally)..."
                  className="w-full h-28 p-3 rounded bg-[var(--panel2)] border border-[var(--line-subtle)] text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--line)] transition-colors resize-y leading-relaxed font-mono"
                />
                <p className="text-[10px] text-[var(--ink3)]">// Persisted in browser localStorage.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 12: Key Takeaways */}
        <section id="section-takeaways" className="scroll-mt-24 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
              // 12. KEY ARCHITECTURAL TAKEAWAYS
            </h2>
            <span className="text-[10px] text-emerald-500 font-bold">[ CHECKLIST ]</span>
          </div>
          <div className="p-4 sm:p-5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] space-y-3">
            {lesson.keyTakeaways.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink)]">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 13: Authoritative References */}
        <section id="section-references" className="scroll-mt-24 pt-4 border-t-2 border-[var(--line)] space-y-3">
          <span className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider block">
            // AUTHORITATIVE UPSTREAM DOCUMENTATION & REFERENCES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.officialDocLinks.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] transition-all flex items-start justify-between gap-2 group"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors block">
                    {doc.title} ↗
                  </span>
                  <span className="text-[11px] text-[var(--ink3)] mt-0.5 block leading-normal italic">
                    {doc.note}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--ink3)] group-hover:text-[var(--accent)] shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </section>

        {/* Next & Previous Navigation Bar (Desktop & Tablet) */}
        <div className="pt-6 border-t-2 border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id)}
              className="w-full sm:w-auto flex items-center gap-3 p-3 px-4 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] text-left transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--ink3)] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--ink3)] block">// PREVIOUS LESSON</span>
                <span className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--accent)] line-clamp-1">{prevLesson.title}</span>
              </div>
            </button>
          ) : <div />}

          {nextLesson ? (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="w-full sm:w-auto flex items-center justify-end gap-3 p-3 px-4 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent)] text-right transition-all group cursor-pointer"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--accent)] block">// NEXT LESSON</span>
                <span className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--accent)] line-clamp-1">{nextLesson.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="text-xs text-emerald-500 font-bold p-3 px-4 rounded-xl border border-emerald-500/30 bg-[var(--panel)]">
              🎉 Handbook Complete! Proceed to the Capstone.
            </div>
          )}
        </div>
      </div>

      {/* 3. Floating Mobile Chapter Dock (Android Thumb-Friendly) */}
      <aside 
        aria-label="Mobile Chapter Controls"
        className="fixed bottom-16 left-3 right-3 z-30 bg-[var(--panel)] border-2 border-[var(--line)] rounded-xl p-2.5 flex items-center justify-between shadow-2xl md:hidden no-print"
      >
        <button
          onClick={() => prevLesson && onNavigateLesson(prevLesson.id)}
          disabled={!prevLesson}
          className={`p-2 rounded border ${
            prevLesson 
              ? 'bg-[var(--panel2)] border-[var(--line)] text-[var(--ink)] cursor-pointer' 
              : 'border-[var(--line-subtle)] text-[var(--ink3)] opacity-40 cursor-not-allowed'
          }`}
          title="Previous Chapter"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center min-w-0 px-2 text-center">
          <span className="text-[10px] text-[var(--ink3)] uppercase font-semibold">
            M{currentModule?.number} // {lesson.id}
          </span>
          <span className="text-xs font-bold text-[var(--ink)] truncate max-w-[170px]">
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleComplete}
            className={`p-2 rounded border transition-all ${
              isCompleted 
                ? 'bg-emerald-600 border-emerald-600 text-white' 
                : 'bg-[var(--panel2)] border-[var(--line)] text-[var(--ink)]'
            }`}
            title={isCompleted ? "Completed" : "Mark Complete"}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => nextLesson && onNavigateLesson(nextLesson.id)}
            disabled={!nextLesson}
            className={`p-2 rounded border ${
              nextLesson 
                ? 'bg-[var(--line)] border-[var(--line)] text-[var(--bg)] cursor-pointer' 
                : 'border-[var(--line-subtle)] text-[var(--ink3)] opacity-40 cursor-not-allowed'
            }`}
            title="Next Chapter"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </article>
  );
};
