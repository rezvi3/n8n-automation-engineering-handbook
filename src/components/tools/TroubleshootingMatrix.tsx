import React, { useState } from 'react';
import { troubleshootingCases } from '../../data/troubleshooting';
import { TroubleshootingCase } from '../../types/curriculum';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export const TroubleshootingMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(troubleshootingCases[0]?.id || null);

  const categories = ['All', 'HTTP & APIs', 'Expressions & Data', 'Execution & Memory', 'Webhooks & Network', 'Credentials & Auth', 'AI & LLM Nodes'];

  const filteredCases = troubleshootingCases.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      c.symptom.toLowerCase().includes(q) ||
      c.rootCause.toLowerCase().includes(q) ||
      c.concreteFix.toLowerCase().includes(q) ||
      (c.errorCode && c.errorCode.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-mono text-xs space-y-4 text-[var(--ink)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--line-subtle)] gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
            // DIAGNOSTIC ERROR CATALOGUE
          </span>
          <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
            Production Troubleshooting Matrix (20+ Cases)
          </h3>
          <p className="text-xs text-[var(--ink2)] italic">
            Exact error codes, architectural root causes, and verified production fixes.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3 h-3 text-[var(--ink3)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms or error codes..."
            className="pl-7 pr-3 py-1.5 text-xs rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none focus:border-[var(--line)] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              selectedCategory === cat 
                ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold' 
                : 'border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div className="space-y-3 pt-2">
        {filteredCases.length === 0 ? (
          <div className="text-center py-12 text-xs text-[var(--ink3)]">
            No troubleshooting cases found matching "{searchQuery}".
          </div>
        ) : (
          filteredCases.map((c: TroubleshootingCase) => {
            const isExpanded = expandedId === c.id;

            return (
              <div
                key={c.id}
                className="rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  className="p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--panel)] transition-colors gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--line-subtle)] text-[var(--ink2)] shrink-0">
                      [ {c.category} ]
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-[var(--ink)] truncate">
                      {c.symptom}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {c.errorCode && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded border border-rose-500/40 text-rose-500 font-bold hidden sm:inline">
                        {c.errorCode}
                      </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[var(--ink3)]" /> : <ChevronDown className="w-3.5 h-3.5 text-[var(--ink3)]" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-[var(--line-subtle)] bg-[var(--panel)] space-y-3 text-xs leading-relaxed">
                    <div>
                      <strong className="text-[var(--accent)] block mb-1 uppercase">// ROOT CAUSE DIAGNOSIS:</strong>
                      <p className="text-[var(--ink)]">{c.rootCause}</p>
                    </div>

                    <div className="p-3 rounded border border-emerald-500/40 bg-[var(--panel2)] text-[var(--ink)]">
                      <strong className="text-emerald-500 block mb-1 uppercase">// PRODUCTION FIX:</strong>
                      <p className="whitespace-pre-line">{c.concreteFix}</p>
                    </div>

                    {c.preventativeMeasures && (
                      <div className="text-[11px] text-[var(--ink2)] pt-1 border-t border-[var(--line-subtle)]">
                        <strong>// PREVENTION RULE: </strong> {c.preventativeMeasures}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
