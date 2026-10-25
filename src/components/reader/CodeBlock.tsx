import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border-2 border-[var(--line)] bg-[var(--panel)] shadow-sm font-mono text-xs">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--panel2)] border-b border-[var(--line-subtle)] text-[11px] text-[var(--ink2)]">
        <span className="font-bold text-[var(--ink)]">// {title || language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] text-[var(--ink)] transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? '[ COPIED ✓ ]' : '[ COPY ]'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed text-[var(--ink)]">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
