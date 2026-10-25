import React, { useState } from 'react';
import { downloadableResources } from '../../data/downloads';
import { ResourceItem } from '../../types/curriculum';
import { Download, Copy, Check } from 'lucide-react';
import { CodeBlock } from '../reader/CodeBlock';

export const ResourceHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Workflows', 'Templates', 'Checklists', 'Sample Data'];

  const filteredResources = downloadableResources.filter(r => 
    selectedCategory === 'All' || r.category === selectedCategory
  );

  const handleDownload = (item: ResourceItem) => {
    const filename = item.downloadFilename || `${item.id}.txt`;
    const blob = new Blob([item.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-8 font-mono text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[var(--line)] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block mb-1">
            // DEVELOPER TOOLING & SPEC ASSETS
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
            Downloads, Checklists & Templates
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink2)] mt-1 italic">
            Production-ready workflow JSON files, client proposal specs, and audit checklists.
          </p>
        </div>

        {/* Filter Pills */}
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
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="archival-card p-5 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line-subtle)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)]">
                    [ {item.category.toUpperCase()} ]
                  </span>
                  <span className="text-xs text-[var(--ink3)]">{item.downloadFilename}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--ink2)] mt-0.5 italic">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(item.id, item.content)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] text-xs text-[var(--ink)] font-bold transition-colors cursor-pointer"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? '[ COPIED ✓ ]' : '[ COPY ]'}</span>
                </button>

                <button
                  onClick={() => handleDownload(item)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded border-2 border-[var(--line)] bg-[var(--line)] text-[var(--bg)] text-xs font-bold transition-all hover:opacity-90 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>[ DOWNLOAD FILE ]</span>
                </button>
              </div>
            </div>

            {/* Preview code snippet */}
            <div className="pt-1">
              <CodeBlock 
                code={item.content.slice(0, 1500) + (item.content.length > 1500 ? '\n... (truncated in preview - click Download for full file)' : '')} 
                language={item.category === 'Workflows' || item.category === 'Sample Data' ? 'json' : 'markdown'} 
                title={item.downloadFilename} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
