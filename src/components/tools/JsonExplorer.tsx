import React, { useState } from 'react';
import { Copy, Check, Search, ChevronRight, ChevronDown, Braces } from 'lucide-react';

const defaultJsonSample = {
  "leadId": "LD-90214",
  "customer": {
    "fullName": "Alice Smith",
    "email": "alice@acmecorp.com",
    "contact": {
      "phone": "+15550192834",
      "address": {
        "city": "Austin",
        "state": "TX",
        "postalCode": "78701"
      }
    }
  },
  "qualification": {
    "budget": 25000,
    "tier": "Enterprise Tier 1",
    "isVIP": true
  },
  "lineItems": [
    { "sku": "PLAN-ENT", "name": "Enterprise Annual License", "price": 20000 },
    { "sku": "SRV-ONBOARD", "name": "Dedicated Onboarding", "price": 5000 }
  ],
  "submittedAt": "2026-10-25T01:30:00.000Z"
};

export const JsonExplorer: React.FC = () => {
  const [inputStr, setInputStr] = useState<string>(JSON.stringify(defaultJsonSample, null, 2));
  const [parsedJson, setParsedJson] = useState<any>(defaultJsonSample);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copiedExpr, setCopiedExpr] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState<string>('');

  const handleJsonChange = (text: string) => {
    setInputStr(text);
    try {
      const parsed = JSON.parse(text);
      setParsedJson(parsed);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const handleCopyExpression = (expr: string) => {
    navigator.clipboard.writeText(expr);
    setCopiedExpr(expr);
    setTimeout(() => setCopiedExpr(null), 2000);
  };

  const renderTree = (data: any, path = '$json'): React.ReactNode => {
    if (data === null) {
      return <span className="text-[var(--ink3)]">null</span>;
    }
    if (typeof data === 'boolean') {
      return <span className="text-purple-500 font-bold">{data ? 'true' : 'false'}</span>;
    }
    if (typeof data === 'number') {
      return <span className="text-amber-500 font-bold">{data}</span>;
    }
    if (typeof data === 'string') {
      return <span className="text-emerald-500">"{data}"</span>;
    }

    if (Array.isArray(data)) {
      return (
        <div className="pl-3 border-l border-[var(--line-subtle)] space-y-1 my-1">
          {data.map((item, idx) => {
            const itemPath = `${path}[${idx}]`;
            return (
              <div key={idx} className="flex items-start gap-1 group/item">
                <button
                  onClick={() => handleCopyExpression(`{{ ${itemPath} }}`)}
                  className="text-[10px] text-[var(--ink3)] hover:text-[var(--accent)] font-bold transition-colors cursor-pointer"
                  title={`Click to copy: {{ ${itemPath} }}`}
                >
                  [{idx}]
                </button>
                <div className="flex-1">
                  {renderTree(item, itemPath)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof data === 'object') {
      const keys = Object.keys(data).filter(k => 
        !filterTerm || k.toLowerCase().includes(filterTerm.toLowerCase())
      );

      return (
        <div className="pl-3 border-l border-[var(--line-subtle)] space-y-1 my-1">
          {keys.map((key) => {
            const val = data[key];
            const childPath = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
              ? `${path}.${key}`
              : `${path}['${key}']`;

            return (
              <div key={key} className="flex flex-col group/row">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleCopyExpression(`{{ ${childPath} }}`)}
                    className="font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                    title={`Click to copy: {{ ${childPath} }}`}
                  >
                    "{key}":
                  </button>
                  {typeof val !== 'object' && renderTree(val, childPath)}
                </div>
                {typeof val === 'object' && val !== null && (
                  <div className="pl-2">
                    {renderTree(val, childPath)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="font-mono text-xs space-y-4 text-[var(--ink)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--line-subtle)] gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
            // JSON STRUCTURE INSPECTOR & EXPRESSION GENERATOR
          </span>
          <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
            Interactive JSON Explorer & Path Extractor
          </h3>
          <p className="text-xs text-[var(--ink2)] italic">
            Click any key in the data tree to copy the exact runtime n8n expression ($json...).
          </p>
        </div>

        <div className="relative">
          <Search className="w-3 h-3 text-[var(--ink3)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Filter keys..."
            className="pl-7 pr-3 py-1 text-xs rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)] placeholder-[var(--ink3)] focus:outline-none focus:border-[var(--line)] w-36 sm:w-44"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Raw JSON Input / Editor */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[var(--ink2)]">
            <span>// EDIT RAW INPUT JSON:</span>
            {jsonError ? (
              <span className="text-rose-500 font-bold">Invalid JSON syntax</span>
            ) : (
              <span className="text-emerald-500 font-bold">✓ Valid JSON</span>
            )}
          </div>
          <textarea
            value={inputStr}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-80 p-3 rounded-lg bg-[var(--panel2)] border border-[var(--line-subtle)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--line)] resize-none leading-relaxed font-mono"
          />
        </div>

        {/* Right: Interactive Tree with Expression Click-to-Copy */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[var(--ink2)]">
            <span>// DATA TREE (CLICK KEY TO COPY PATH):</span>
            {copiedExpr && (
              <span className="text-[var(--accent)] font-bold animate-pulse">[ COPIED: {copiedExpr} ]</span>
            )}
          </div>
          <div className="w-full h-80 p-3.5 rounded-lg bg-[var(--panel2)] border border-[var(--line-subtle)] overflow-auto">
            {parsedJson ? (
              renderTree(parsedJson)
            ) : (
              <div className="text-xs text-rose-500 p-4">Please correct JSON syntax errors on the left.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
