import React, { useState } from 'react';
import { QuizQuestion } from '../../types/curriculum';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ questions, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    if (onComplete) {
      onComplete(Math.round((correctCount / questions.length) * 100));
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="my-8 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6 shadow-sm font-mono text-[var(--ink)]">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--line-subtle)]">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
            // COMPREHENSION VERIFICATION QUIZ
          </h4>
          <p className="text-xs text-[var(--ink3)]">Validate conceptual mastery before proceeding</p>
        </div>
        {submitted && (
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-0.5 rounded font-bold border ${
              correctCount === questions.length 
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' 
                : 'border-amber-500 bg-amber-500/10 text-amber-500'
            }`}>
              SCORE: {correctCount}/{questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
            </span>
            <button
              onClick={handleReset}
              className="p-1 rounded border border-[var(--line-subtle)] text-[var(--ink2)] hover:text-[var(--ink)] cursor-pointer"
              title="Retake Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-5">
        {questions.map((q, qIndex) => {
          const selectedIdx = selectedAnswers[q.id];
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div key={q.id} className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] space-y-3">
              <p className="text-xs sm:text-sm font-bold text-[var(--ink)] leading-relaxed">
                <span className="text-[var(--accent)] mr-2">// Q{qIndex + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-1.5">
                {q.options.map((opt, optIndex) => {
                  let btnStyle = 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)] hover:border-[var(--line)]';

                  if (selectedIdx === optIndex) {
                    btnStyle = 'border-2 border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold';
                  }

                  if (submitted) {
                    if (optIndex === q.correctIndex) {
                      btnStyle = 'border-2 border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold';
                    } else if (selectedIdx === optIndex && !isCorrect) {
                      btnStyle = 'border-2 border-rose-500 bg-rose-500/10 text-rose-500 line-through';
                    } else {
                      btnStyle = 'opacity-50 border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink3)]';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3 min-h-[44px] rounded border text-xs flex items-start justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {submitted && optIndex === q.correctIndex && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {submitted && selectedIdx === optIndex && !isCorrect && (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-2.5 p-3 rounded text-xs leading-relaxed border ${
                  isCorrect 
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600' 
                    : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink)]'
                }`}>
                  <span className="font-bold block mb-0.5">{isCorrect ? '✓ Correct Reasoning:' : '✗ Correction:'}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full sm:w-auto px-5 py-2.5 rounded border-2 border-[var(--line)] text-xs font-bold transition-all ${
              allAnswered 
                ? 'bg-[var(--line)] text-[var(--bg)] cursor-pointer hover:opacity-90 shadow-sm' 
                : 'border-[var(--line-subtle)] text-[var(--ink3)] opacity-40 cursor-not-allowed'
            }`}
          >
            [ SUBMIT ANSWERS ]
          </button>
        </div>
      )}
    </div>
  );
};
