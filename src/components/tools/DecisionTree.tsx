import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Check } from 'lucide-react';

interface QuestionNode {
  id: string;
  question: string;
  options: {
    text: string;
    nextId?: string;
    recommendedNode?: {
      name: string;
      category: string;
      why: string;
    };
  }[];
}

const decisionTreeData: Record<string, QuestionNode> = {
  start: {
    id: 'start',
    question: 'What is the primary operational action you need to perform in this step?',
    options: [
      { text: 'Trigger or initiate a workflow from an event or schedule', nextId: 'q_trigger' },
      { text: 'Filter, branch, or route records conditionally', nextId: 'q_routing' },
      { text: 'Modify, clean, or reshape incoming data', nextId: 'q_transform' },
      { text: 'Interact with an external system or API', nextId: 'q_external' },
      { text: 'Pause execution or wait for approval', nextId: 'q_pause' }
    ]
  },
  q_trigger: {
    id: 'q_trigger',
    question: 'How should the workflow wake up?',
    options: [
      {
        text: 'The instant an external system sends an HTTP POST event (e.g. Stripe, Typeform)',
        recommendedNode: {
          name: 'Webhook Trigger',
          category: 'Trigger',
          why: 'Exposes an instant HTTP listener endpoint with sub-second execution.'
        }
      },
      {
        text: 'On a recurring clock interval (e.g. daily at 8am, every 15 minutes)',
        recommendedNode: {
          name: 'Schedule Trigger',
          category: 'Trigger',
          why: 'Uses node-cron to execute automatically on exact time intervals and timezones.'
        }
      },
      {
        text: 'Called by another parent n8n workflow as a sub-function',
        recommendedNode: {
          name: 'Execute Workflow Trigger',
          category: 'Trigger',
          why: 'Allows modular architecture by turning workflows into callable sub-workflows.'
        }
      }
    ]
  },
  q_routing: {
    id: 'q_routing',
    question: 'How many conditional branches do you need to split records across?',
    options: [
      {
        text: 'Binary True / False branch based on 1-4 boolean rules',
        recommendedNode: {
          name: 'If Node',
          category: 'Logic / Flow',
          why: 'Fastest and cleanest evaluation for binary branching decisions.'
        }
      },
      {
        text: 'Multiple branches (3 to 10+ outputs) based on a status, category or enum',
        recommendedNode: {
          name: 'Switch Node',
          category: 'Logic / Flow',
          why: 'Multi-way router that prevents messy cascaded If trees.'
        }
      },
      {
        text: 'Route based on an AI LLM understanding user intent from freeform text',
        recommendedNode: {
          name: 'AI Agent with Tool Calling',
          category: 'AI / Advanced',
          why: 'Uses LLMs to classify unstructured input and invoke specific sub-tools dynamically.'
        }
      }
    ]
  },
  q_transform: {
    id: 'q_transform',
    question: 'What kind of data transformation do you need to perform?',
    options: [
      {
        text: 'Standard field picking, renaming, or static values without custom code',
        recommendedNode: {
          name: 'Edit Fields (Set) Node',
          category: 'Transform',
          why: 'Zero-code interface for mapping inputs to outputs with full expression support.'
        }
      },
      {
        text: 'Complex multi-step algorithmic transformation, regex, or nested loops',
        recommendedNode: {
          name: 'Code Node (JavaScript / Python)',
          category: 'Code / Scripting',
          why: 'Full sandbox environment with access to $input.all() and lodash utilities.'
        }
      },
      {
        text: 'Split an array of items into separate individual items for processing',
        recommendedNode: {
          name: 'Split Out Node',
          category: 'Transform',
          why: 'Unnests array properties into separate top-level n8n items.'
        }
      },
      {
        text: 'Aggregate multiple items back into a single array or summary record',
        recommendedNode: {
          name: 'Aggregate Node',
          category: 'Transform',
          why: 'Combines multiple execution items into a single grouped array payload.'
        }
      }
    ]
  },
  q_external: {
    id: 'q_external',
    question: 'What kind of external system are you communicating with?',
    options: [
      {
        text: 'Any REST, GraphQL or webhook API with JSON payloads',
        recommendedNode: {
          name: 'HTTP Request Node',
          category: 'Network / API',
          why: 'The universal Swiss Army knife for calling external endpoints with full auth support.'
        }
      },
      {
        text: 'A relational database like PostgreSQL or MySQL',
        recommendedNode: {
          name: 'Postgres / MySQL Node',
          category: 'Database',
          why: 'Optimized connection pooling and parameterized query execution.'
        }
      },
      {
        text: 'A vector database or semantic knowledge base for AI embeddings',
        recommendedNode: {
          name: 'Qdrant / Pinecone Vector Store',
          category: 'AI / Vector DB',
          why: 'Enables high-performance vector retrieval and cosine similarity search for RAG.'
        }
      }
    ]
  },
  q_pause: {
    id: 'q_pause',
    question: 'Why do you need to pause execution?',
    options: [
      {
        text: 'Wait for a specified duration (e.g. wait 5 minutes between retries)',
        recommendedNode: {
          name: 'Wait Node (Duration)',
          category: 'Flow',
          why: 'Suspends the execution without consuming CPU threads and resumes automatically.'
        }
      },
      {
        text: 'Wait for a human to approve via an email link or webhook callback',
        recommendedNode: {
          name: 'Wait Node (Webhook Callback)',
          category: 'Flow',
          why: 'Generates a unique resume URL and keeps state until human approves or rejects.'
        }
      }
    ]
  }
};

export const DecisionTree: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [recommendedNode, setRecommendedNode] = useState<{ name: string; category: string; why: string } | null>(null);

  const currentNode = decisionTreeData[currentNodeId];
  const isResult = recommendedNode !== null;

  const handleSelectOption = (option: QuestionNode['options'][0]) => {
    if (option.recommendedNode) {
      setRecommendedNode(option.recommendedNode);
      return;
    }
    if (option.nextId) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(option.nextId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
    setRecommendedNode(null);
  };

  return (
    <div className="font-mono text-xs space-y-4 text-[var(--ink)]">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--line-subtle)]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
            // ARCHITECTURAL NODE DIAGNOSTICS
          </span>
          <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
            Interactive Node Selection Decision Tree
          </h3>
          <p className="text-xs text-[var(--ink2)] italic">
            Diagnose your automation requirements step-by-step to select the optimal n8n node.
          </p>
        </div>
        {(history.length > 0 || isResult) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>[ RESTART ]</span>
          </button>
        )}
      </div>

      <div className="pt-2">
        {!isResult && currentNode ? (
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[var(--ink)]">
              // {currentNode.question}
            </h4>
            <div className="space-y-2">
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-3.5 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] hover:border-[var(--line)] text-[var(--ink)] text-xs font-medium transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--ink3)] group-hover:text-[var(--accent)] shrink-0 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : recommendedNode ? (
          <div className="p-5 rounded-lg border-2 border-[var(--line)] bg-[var(--panel2)] space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-wider text-xs">
              <Check className="w-4 h-4" />
              <span>// RECOMMENDED ARCHITECTURE DECISION:</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[var(--ink)]">
              {recommendedNode.name}
            </h4>
            <span className="inline-block text-[11px] px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel)] font-bold text-[var(--ink)]">
              CATEGORY: {recommendedNode.category}
            </span>
            <p className="text-xs text-[var(--ink)] leading-relaxed pt-1">
              <strong className="text-[var(--accent)]">// RATIONALE: </strong>{recommendedNode.why}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
