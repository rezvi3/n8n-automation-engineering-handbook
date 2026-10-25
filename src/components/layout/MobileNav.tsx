import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Wrench, 
  FolderGit2, 
  Menu, 
  X, 
  Download, 
  HelpCircle, 
  Search, 
  RotateCcw, 
  ExternalLink 
} from 'lucide-react';
import { ActiveTab } from './Header';

interface MobileNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onToggleCurriculum: () => void;
  progressPercentage: number;
  completedCount: number;
  totalCount: number;
  onResetProgress: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  onOpenSearch,
  onToggleCurriculum,
  progressPercentage,
  completedCount,
  totalCount,
  onResetProgress
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCurriculumClick = () => {
    if (activeTab !== 'reader') {
      onTabChange('reader');
    } else {
      onToggleCurriculum();
    }
  };

  return (
    <>
      {/* Mobile Drawer for "More" */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex flex-col justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--bg)] border-t-2 border-[var(--line)] rounded-t-2xl p-5 space-y-4 font-mono text-xs text-[var(--ink)] animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line-subtle)]">
              <div>
                <span className="font-bold text-sm block">// ARCHIVE NAVIGATION</span>
                <span className="text-[10px] text-[var(--ink3)]">Select target sector</span>
              </div>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded border border-[var(--line-subtle)] text-[var(--ink2)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Card */}
            <div className="p-3 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[var(--ink3)] block">// COMPLETION</span>
                <span className="font-bold text-sm">{progressPercentage}% ({completedCount}/{totalCount})</span>
              </div>
              <button
                onClick={() => {
                  if (confirm('Reset your progress?')) {
                    onResetProgress();
                    setMenuOpen(false);
                  }
                }}
                className="p-1.5 rounded border border-[var(--line-subtle)] text-[var(--ink3)] hover:text-rose-500"
                title="Reset Progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Navigation Options */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onTabChange('resources');
                  setMenuOpen(false);
                }}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeTab === 'resources'
                    ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold'
                    : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)]'
                }`}
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="font-bold block">[ Downloads ]</span>
                <span className="text-[10px] text-[var(--ink3)]">JSONs & Specs</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('glossary');
                  setMenuOpen(false);
                }}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeTab === 'glossary'
                    ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold'
                    : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)]'
                }`}
              >
                <HelpCircle className="w-4 h-4 mb-1" />
                <span className="font-bold block">[ Glossary ]</span>
                <span className="text-[10px] text-[var(--ink3)]">60+ Terms</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSearch();
                }}
                className="p-3 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel)] text-left cursor-pointer"
              >
                <Search className="w-4 h-4 mb-1" />
                <span className="font-bold block">[ Search Modal ]</span>
                <span className="text-[10px] text-[var(--ink3)]">Global Index</span>
              </button>

              <a
                href="https://docs.n8n.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel)] text-left"
              >
                <ExternalLink className="w-4 h-4 mb-1" />
                <span className="font-bold block">[ Official Docs ]</span>
                <span className="text-[10px] text-[var(--ink3)]">docs.n8n.io ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--panel)] border-t-2 border-[var(--line)] h-14 px-2 flex items-center justify-around md:hidden no-print safe-area-bottom font-mono select-none"
      >
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'home' ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink3)]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
          {activeTab === 'home' && <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-0.5" />}
        </button>

        <button
          onClick={handleCurriculumClick}
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'reader' ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink3)]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Reader</span>
          {activeTab === 'reader' && <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-0.5" />}
        </button>

        <button
          onClick={() => onTabChange('tools')}
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'tools' ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink3)]'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Tools</span>
          {activeTab === 'tools' && <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-0.5" />}
        </button>

        <button
          onClick={() => onTabChange('projects')}
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'projects' ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink3)]'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Projects</span>
          {activeTab === 'projects' && <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-0.5" />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            menuOpen || ['resources', 'glossary'].includes(activeTab) ? 'text-[var(--ink)] font-bold' : 'text-[var(--ink3)]'
          }`}
        >
          <Menu className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>
    </>
  );
};
