import React, { useState } from 'react';
import { glossaryTerms } from '../../data/glossary';
import { GlossaryTerm } from '../../types/curriculum';
import { HelpCircle, X, Sparkles, Eye, BookOpen, Search, ArrowRight } from 'lucide-react';

interface TermExplainerModalProps {
  termName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectTerm?: (newTerm: string) => void;
}

export const TermExplainerModal: React.FC<TermExplainerModalProps> = ({
  termName,
  isOpen,
  onClose,
  onSelectTerm
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  // Find exact or closest match
  const termData: GlossaryTerm | undefined = glossaryTerms.find(
    g => g.term.toLowerCase() === termName.toLowerCase()
  ) || glossaryTerms.find(
    g => g.term.toLowerCase().includes(termName.toLowerCase()) ||
         termName.toLowerCase().includes(g.term.toLowerCase())
  );

  const filteredList = searchFilter.trim() 
    ? glossaryTerms.filter(t => 
        t.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.plainEnglishDefinition.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : glossaryTerms.slice(0, 12);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm font-mono animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[var(--line)] bg-[var(--panel)] shadow-2xl text-[var(--ink)] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--line)] flex items-center justify-between sticky top-0 bg-[var(--panel)] z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs">
              ?
            </div>
            <div>
              <span className="text-[10px] text-[var(--ink3)] block uppercase tracking-wider">
                // 3-LEVEL BEGINNER CONCEPT EXPLAINER
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)]">
                {termData ? termData.term : termName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--line-subtle)] hover:border-[var(--line)] text-[var(--ink2)] hover:text-[var(--ink)] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          {termData ? (
            <>
              {/* LEVEL 1: Everyday Explanation */}
              <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-[var(--panel2)] space-y-2">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>LEVEL 1: EXPLAIN IT LIKE I AM COMPLETELY NEW</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                  {termData.analogy || termData.plainEnglishDefinition}
                </p>
                {termData.analogy && (
                  <p className="text-xs text-[var(--ink2)] italic border-t border-[var(--line-subtle)] pt-2 mt-2">
                    <strong>Everyday Analogy: </strong>{termData.plainEnglishDefinition}
                  </p>
                )}
              </div>

              {/* LEVEL 2: Visual Diagram */}
              <div className="p-4 rounded-xl border-2 border-blue-500/40 bg-[var(--panel2)] space-y-2">
                <div className="flex items-center gap-2 text-blue-500 font-bold text-xs">
                  <Eye className="w-4 h-4" />
                  <span>LEVEL 2: WHAT IT LOOKS LIKE</span>
                </div>
                {termData.visualDiagram ? (
                  <pre className="p-3 rounded-lg bg-[var(--panel)] border border-[var(--line-subtle)] text-[11px] sm:text-xs text-[var(--ink)] overflow-x-auto leading-relaxed">
                    {termData.visualDiagram}
                  </pre>
                ) : (
                  <div className="p-3 rounded-lg bg-[var(--panel)] border border-[var(--line-subtle)] text-xs text-[var(--ink)] flex items-center justify-center gap-2 text-center">
                    <span className="font-bold">[ Event Occurs ]</span>
                    <span>→</span>
                    <span className="font-bold text-[var(--accent)]">[ {termData.term} ]</span>
                    <span>→</span>
                    <span className="font-bold">[ Result Produced ]</span>
                  </div>
                )}
              </div>

              {/* LEVEL 3: Actual Technical Term in n8n */}
              <div className="p-4 rounded-xl border-2 border-[var(--line)] bg-[var(--panel2)] space-y-2">
                <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs">
                  <BookOpen className="w-4 h-4" />
                  <span>LEVEL 3: THE ACTUAL TECHNICAL TERM IN N8N</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                  {termData.technicalDefinition}
                </p>
                <div className="p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--line-subtle)] text-xs text-[var(--ink2)]">
                  <strong className="text-[var(--ink)]">// How n8n uses it: </strong>
                  {termData.n8nContext}
                </div>
              </div>

              {/* Related Terms */}
              {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-[var(--ink3)] block uppercase">
                    // Related Concepts to Explore:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {termData.relatedTerms.map((rel, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectTerm ? onSelectTerm(rel) : null}
                        className="px-2.5 py-1 rounded border border-[var(--line-subtle)] hover:border-[var(--line)] bg-[var(--panel2)] text-xs text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{rel}</span>
                        <ArrowRight className="w-3 h-3 text-[var(--ink3)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center space-y-3">
              <p className="text-sm text-[var(--ink2)]">
                Looking for term: <strong className="text-[var(--ink)]">{termName}</strong>
              </p>
              <p className="text-xs text-[var(--ink3)]">
                Select one of the common concepts below or search our beginner glossary:
              </p>
            </div>
          )}

          {/* Search other terms */}
          <div className="pt-4 border-t border-[var(--line-subtle)] space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink3)]" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search any term (e.g. JSON, Webhook, Node, Trigger, API)..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--panel2)] border border-[var(--line-subtle)] text-xs text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none focus:border-[var(--line)]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              {filteredList.map((t) => (
                <button
                  key={t.term}
                  onClick={() => onSelectTerm ? onSelectTerm(t.term) : null}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer ${
                    termData?.term === t.term
                      ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold'
                      : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                  }`}
                >
                  {t.term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[var(--line-subtle)] bg-[var(--panel2)] text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold text-xs hover:opacity-90 cursor-pointer"
          >
            [ CLOSE EXPLAINER ]
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermPill: React.FC<{ term: string; label?: string }> = ({ term, label }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTerm, setCurrentTerm] = useState(term);

  return (
    <>
      <span
        onClick={() => {
          setCurrentTerm(term);
          setModalOpen(true);
        }}
        className="inline-flex items-center gap-0.5 px-1 py-0.2 mx-0.5 rounded border-b-2 border-dotted border-[var(--accent)] text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 cursor-pointer transition-colors"
        title={`Click to explain: "${term}" in plain English`}
      >
        <span className="font-bold">{label || term}</span>
        <HelpCircle className="w-2.5 h-2.5 text-[var(--accent)] inline ml-0.5 shrink-0" />
      </span>

      <TermExplainerModal
        termName={currentTerm}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectTerm={(newTerm) => setCurrentTerm(newTerm)}
      />
    </>
  );
};
