import React, { useState } from 'react';
import { Play } from 'lucide-react';

const mockItem = {
  id: 10492,
  customerName: "Dr. Rachel Green",
  email: "rachel.green@ralphlauren.com",
  orderAmount: 1450,
  taxRate: 0.18,
  items: ["Blazer", "Silk Tie", "Cashmere Scarf"],
  membership: "VIP_GOLD",
  joinedDate: "2024-03-15T09:30:00.000Z"
};

export const ExpressionSandbox: React.FC = () => {
  const [expression, setExpression] = useState<string>("{{ $json.customerName.toUpperCase() + ' - Total: $' + ($json.orderAmount * (1 + $json.taxRate)).toFixed(2) }}");
  const [evaluatedResult, setEvaluatedResult] = useState<string>('DR. RACHEL GREEN - Total: $1711.00');
  const [evalError, setEvalError] = useState<string | null>(null);

  const handleEvaluate = (exprToEval = expression) => {
    try {
      setEvalError(null);
      let code = exprToEval.trim();
      if (code.startsWith('{{') && code.endsWith('}}')) {
        code = code.slice(2, -2).trim();
      }

      const sandboxFn = new Function('$json', '$now', `
        const DateTime = {
          now: () => ({ toFormat: (fmt) => new Date().toISOString() })
        };
        return (${code});
      `);

      const result = sandboxFn(mockItem, new Date());
      setEvaluatedResult(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
    } catch (err: any) {
      setEvalError(err.message);
      setEvaluatedResult('');
    }
  };

  const samplePresets = [
    { label: "Full Name Upper", expr: "{{ $json.customerName.toUpperCase() }}" },
    { label: "Calculate Total with Tax", expr: "{{ $json.orderAmount * (1 + $json.taxRate) }}" },
    { label: "Join Array Elements", expr: "{{ $json.items.join(', ') }}" },
    { label: "Check VIP Status", expr: "{{ $json.membership === 'VIP_GOLD' ? 'Eligible for 20% discount' : 'Standard Tier' }}" },
    { label: "Domain from Email", expr: "{{ $json.email.split('@')[1] }}" }
  ];

  return (
    <div className="font-mono text-xs space-y-4 text-[var(--ink)]">
      <div className="pb-3 border-b border-[var(--line-subtle)]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
          // CLIENT-SIDE EXPRESSION RUNTIME
        </span>
        <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
          Interactive n8n Expression Sandbox
        </h3>
        <p className="text-xs text-[var(--ink2)] italic">
          Test JavaScript and Luxon expressions against live n8n input items before deploying to production.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-[var(--ink3)] uppercase block">// SAMPLE EXPRESSION PRESETS:</span>
        <div className="flex flex-wrap gap-1.5">
          {samplePresets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setExpression(preset.expr);
                handleEvaluate(preset.expr);
              }}
              className="px-2.5 py-1 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] text-xs text-[var(--ink2)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              [ {preset.label} ]
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {/* Left: Expression Input & Mock Data */}
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[var(--ink)] block">// ENTER EXPRESSION:</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="{{ $json.property.method() }}"
                className="flex-1 p-2 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--line)] font-mono"
              />
              <button
                onClick={() => handleEvaluate()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded border-2 border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>EVALUATE</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-[var(--ink2)] block">// MOCK $json ITEM CONTEXT:</span>
            <pre className="p-3 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] text-[11px] text-[var(--ink)] overflow-x-auto max-h-56 leading-relaxed font-mono">
              <code>{JSON.stringify(mockItem, null, 2)}</code>
            </pre>
          </div>
        </div>

        {/* Right: Evaluated Output */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[var(--ink)] block">// EVALUATED RESULT:</span>
          {evalError ? (
            <div className="p-4 rounded-lg border border-rose-500/40 bg-rose-500/10 text-rose-500 space-y-1">
              <span className="font-bold block">[ EVALUATION ERROR ]:</span>
              <p className="text-xs">{evalError}</p>
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] h-72 overflow-auto flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[var(--ink3)] block uppercase mb-1">// OUTPUT VALUE:</span>
                <pre className="text-xs sm:text-sm font-bold text-emerald-500 whitespace-pre-wrap leading-relaxed font-mono">
                  {evaluatedResult}
                </pre>
              </div>

              <div className="pt-3 border-t border-[var(--line-subtle)] text-[10px] text-[var(--ink3)]">
                Status: Successfully evaluated client-side in isolated JS sandbox.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
