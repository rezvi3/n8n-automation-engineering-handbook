import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface JsonInspectorProps {
  beforeTitle?: string;
  beforeData: any;
  afterTitle?: string;
  afterData: any;
  explanation?: string;
}

export const JsonInspector: React.FC<JsonInspectorProps> = ({
  beforeTitle = 'Input Payload (Raw)',
  beforeData,
  afterTitle = 'Transformed Output (n8n JSON)',
  afterData,
  explanation
}) => {
  const [activeTab, setActiveTab] = useState<'sideBySide' | 'before' | 'after'>('sideBySide');
  const [copied, setCopied] = useState(false);

  const beforeStr = typeof beforeData === 'string' ? beforeData : JSON.stringify(beforeData, null, 2);
  const afterStr = typeof afterData === 'string' ? afterData : JSON.stringify(afterData, null, 2);

  const copyJson = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] shadow-sm overflow-hidden font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-[var(--panel2)] border-b border-[var(--line-subtle)] gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--ink)]">// JSON INSPECTOR</span>
          <span className="text-[var(--ink3)]">•</span>
          <span className="text-[var(--ink2)] text-[11px]">Payload Transformation Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex rounded border border-[var(--line-subtle)] bg-[var(--panel)] p-0.5 text-[11px]">
            <button
              onClick={() => setActiveTab('sideBySide')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                activeTab === 'sideBySide' ? 'bg-[var(--line)] text-[var(--bg)] font-bold' : 'text-[var(--ink2)]'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveTab('before')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                activeTab === 'before' ? 'bg-[var(--line)] text-[var(--bg)] font-bold' : 'text-[var(--ink2)]'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                activeTab === 'after' ? 'bg-[var(--line)] text-[var(--bg)] font-bold' : 'text-[var(--ink2)]'
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>

      <div className="p-3.5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {(activeTab === 'sideBySide' || activeTab === 'before') && (
          <div className="rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] p-3 flex flex-col">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)] text-[11px] text-[var(--ink2)]">
              <span className="font-bold text-[var(--ink)]">{beforeTitle}</span>
              <button 
                onClick={() => copyJson(beforeStr)} 
                className="text-[var(--ink2)] hover:text-[var(--ink)] cursor-pointer"
                title="Copy Before JSON"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <pre className="mt-2 text-xs text-[var(--ink)] overflow-x-auto max-h-72 leading-relaxed">
              <code>{beforeStr}</code>
            </pre>
          </div>
        )}

        {(activeTab === 'sideBySide' || activeTab === 'after') && (
          <div className="rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] p-3 flex flex-col">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line-subtle)] text-[11px] text-[var(--ink2)]">
              <span className="font-bold text-[var(--accent)]">{afterTitle}</span>
              <button 
                onClick={() => copyJson(afterStr)} 
                className="text-[var(--ink2)] hover:text-[var(--ink)] cursor-pointer"
                title="Copy After JSON"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <pre className="mt-2 text-xs text-[var(--ink)] overflow-x-auto max-h-72 leading-relaxed">
              <code>{afterStr}</code>
            </pre>
          </div>
        )}
      </div>

      {explanation && (
        <div className="px-4 py-2 bg-[var(--panel2)] border-t border-[var(--line-subtle)] text-xs text-[var(--ink2)]">
          <strong className="text-[var(--ink)]">// LOGIC: </strong>
          {explanation}
        </div>
      )}
    </div>
  );
};
