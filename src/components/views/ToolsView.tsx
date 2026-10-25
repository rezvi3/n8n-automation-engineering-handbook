import React, { useState } from 'react';
import { JsonExplorer } from '../tools/JsonExplorer';
import { ExpressionSandbox } from '../tools/ExpressionSandbox';
import { DecisionTree } from '../tools/DecisionTree';
import { TroubleshootingMatrix } from '../tools/TroubleshootingMatrix';
import { ScribbleRing } from '../common/ScribbleRing';
import { Braces, Sparkles, GitBranch, Wrench } from 'lucide-react';

export const ToolsView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'explorer' | 'sandbox' | 'decision' | 'troubleshoot'>('explorer');

  const TOOLS = [
    { id: 'explorer', label: 'JSON Explorer' },
    { id: 'sandbox', label: 'Expression Sandbox' },
    { id: 'decision', label: 'Node Decision Tree' },
    { id: 'troubleshoot', label: 'Troubleshooting (20+)' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-8 font-mono text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[var(--line)] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block mb-1">
            // INTERACTIVE DIAGNOSTIC LAB
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
            Visual Automation Tools & Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink2)] mt-1 italic">
            Interactive utility sandboxes to inspect JSON structures, test n8n expressions, and troubleshoot production failures.
          </p>
        </div>

        {/* Sub-Tabs styled as inline archival list */}
        <div className="flex items-center flex-wrap gap-1 text-xs">
          {TOOLS.map((tool, idx) => {
            const isActive = activeTool === tool.id;
            const isLast = idx === TOOLS.length - 1;

            return (
              <span key={tool.id} className="inline-flex items-center">
                <button
                  onClick={() => setActiveTool(tool.id)}
                  className={`relative py-1 px-2 cursor-pointer transition-colors ${
                    isActive 
                      ? 'font-bold text-[var(--ink)]' 
                      : 'text-[var(--ink2)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span className="relative z-10">{tool.label}</span>
                  {isActive && <ScribbleRing className="absolute inset-0" />}
                </button>
                {!isLast && <span className="text-[var(--ink3)] mr-2 select-none">,</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* Render Active Tool */}
      <div className="rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6 shadow-sm">
        {activeTool === 'explorer' && <JsonExplorer />}
        {activeTool === 'sandbox' && <ExpressionSandbox />}
        {activeTool === 'decision' && <DecisionTree />}
        {activeTool === 'troubleshoot' && <TroubleshootingMatrix />}
      </div>
    </div>
  );
};
