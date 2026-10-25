import React, { useState } from 'react';
import { StepByStepLab } from '../../types/curriculum';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ExerciseLabProps {
  lab: StepByStepLab;
}

export const ExerciseLab: React.FC<ExerciseLabProps> = ({ lab }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  return (
    <div className="my-8 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6 shadow-sm font-mono text-[var(--ink)]">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--line-subtle)]">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
            // {lab.title}
          </h4>
          <p className="text-xs text-[var(--ink3)]">Practical Hands-on Construction Lab</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] font-bold text-[var(--ink)]">
          {completedSteps.length} of {lab.steps.length} Steps Done
        </span>
      </div>

      <div className="mt-3.5 p-3 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-xs text-[var(--ink)] leading-relaxed">
        <strong className="text-[var(--accent)]">// OBJECTIVE: </strong>
        {lab.goal}
      </div>

      <div className="mt-5 space-y-2.5">
        {lab.steps.map((step) => {
          const isDone = completedSteps.includes(step.stepNumber);
          const isExpanded = expandedStep === step.stepNumber;

          return (
            <div
              key={step.stepNumber}
              className={`rounded-lg border transition-all ${
                isDone 
                  ? 'border-emerald-500/50 bg-[var(--panel)]' 
                  : 'border-[var(--line-subtle)] bg-[var(--panel2)]'
              }`}
            >
              <div
                className="flex items-center justify-between p-3 cursor-pointer"
                onClick={() => setExpandedStep(isExpanded ? null : step.stepNumber)}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(step.stepNumber);
                    }}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors border cursor-pointer ${
                      isDone 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-[var(--line-subtle)] bg-[var(--panel)] text-transparent hover:border-[var(--line)]'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </button>
                  <span className="text-xs font-bold text-[var(--ink2)] shrink-0">
                    Step {step.stepNumber}:
                  </span>
                  <span className={`text-xs sm:text-sm font-bold truncate ${isDone ? 'line-through opacity-60 text-[var(--ink2)]' : 'text-[var(--ink)]'}`}>
                    {step.title}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[var(--ink3)]" /> : <ChevronDown className="w-3.5 h-3.5 text-[var(--ink3)]" />}
              </div>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-[var(--ink)] space-y-2.5 border-t border-[var(--line-subtle)]">
                  <p className="leading-relaxed whitespace-pre-line mt-1.5">{step.instruction}</p>
                  {step.codeSnippet && (
                    <CodeBlock code={step.codeSnippet} language="javascript" title="Node Configuration / Code" />
                  )}
                  {step.tip && (
                    <div className="p-2.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] text-xs">
                      <strong className="text-[var(--accent)]">// PRO TIP: </strong>
                      {step.tip}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3 rounded border border-emerald-500/30 bg-[var(--panel2)] text-xs text-[var(--ink)] leading-relaxed">
        <strong className="text-emerald-500 block mb-0.5">// EXPECTED DELIVERABLE:</strong>
        {lab.expectedResult}
      </div>
    </div>
  );
};
