import React, { useState } from 'react';
import { glossaryTerms } from '../../data/glossary';
import { GlossaryTerm } from '../../types/curriculum';
import { Search } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core Concepts', 'Data & JSON', 'Flow & Logic', 'Protocols & APIs', 'AI & LLMs', 'DevOps & Infrastructure'];

  const filteredTerms = glossaryTerms.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      t.term.toLowerCase().includes(q) ||
      t.plainEnglishDefinition.toLowerCase().includes(q) ||
      t.technicalDefinition.toLowerCase().includes(q) ||
      t.n8nContext.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-8 font-mono text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[var(--line)] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block mb-1">
            // ARCHIVAL DICTIONARY & CONCEPTS
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
            Automation Engineering Glossary
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink2)] mt-1 italic">
            Plain-English explanations, formal computer science definitions, and n8n-specific runtime contexts.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[var(--ink3)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search terms..."
            className="pl-7 pr-3 py-1.5 text-xs rounded border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none focus:border-[var(--line)] w-full sm:w-60"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              selectedCategory === cat 
                ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold' 
                : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Term Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-xs text-[var(--ink3)]">
            No glossary terms found matching "{searchTerm}".
          </div>
        ) : (
          filteredTerms.map((term: GlossaryTerm) => (
            <div
              key={term.term}
              className="archival-card p-5 space-y-3.5"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--line-subtle)]">
                <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
                  {term.term}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink2)]">
                  [ {term.category.toUpperCase()} ]
                </span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div>
                  <strong className="text-[var(--ink)] block mb-0.5">// PLAIN ENGLISH:</strong>
                  <p className="text-[var(--ink2)]">{term.plainEnglishDefinition}</p>
                </div>

                <div>
                  <strong className="text-[var(--ink)] block mb-0.5">// FORMAL DEFINITION:</strong>
                  <p className="text-[var(--ink3)] italic">{term.technicalDefinition}</p>
                </div>

                <div className="p-3 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)]">
                  <strong className="text-[var(--accent)] block mb-0.5">// IN N8N WORKFLOWS:</strong>
                  {term.n8nContext}
                </div>
              </div>

              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[var(--ink3)]">// RELATED:</span>
                  {term.relatedTerms.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchTerm(r)}
                      className="text-[10px] px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink2)] hover:text-[var(--ink)] hover:border-[var(--line)] transition-colors cursor-pointer"
                    >
                      [ {r} ]
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
