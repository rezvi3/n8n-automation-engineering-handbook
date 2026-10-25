import React, { useState } from 'react';
import { projects } from '../../data/projects';
import { Project } from '../../types/curriculum';
import { MermaidDiagram } from '../reader/MermaidDiagram';
import { JsonInspector } from '../reader/JsonInspector';
import { 
  FolderGit2, 
  Download, 
  Clock, 
  CheckCircle2, 
  Check, 
  Layers, 
  FileCode 
} from 'lucide-react';

export const ProjectLibrary: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Professional'];

  const filteredProjects = projects.filter(p => 
    selectedDifficulty === 'All' || p.difficulty === selectedDifficulty
  );

  const handleDownloadJson = (project: Project) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project.workflowJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.id}_workflow.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(project.id);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-8 font-mono text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[var(--line)] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block mb-1">
            // ARCHIVAL ENGINEERING PORTFOLIO
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
            Production Project Library
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink2)] mt-1 italic">
            Full-scale business automation blueprints with tested JSON templates and architecture maps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                selectedDifficulty === diff 
                  ? 'border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold' 
                  : 'border-[var(--line-subtle)] bg-[var(--panel)] text-[var(--ink2)] hover:border-[var(--line)] hover:text-[var(--ink)]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Selector Column */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
            // SELECT ARCHIVE SPEC ({filteredProjects.length})
          </span>

          <div className="space-y-2.5 max-h-[780px] overflow-y-auto pr-1">
            {filteredProjects.map((p) => {
              const isSelected = activeProject.id === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-2 border-[var(--line)] bg-[var(--panel)] shadow-md' 
                      : 'border border-[var(--line-subtle)] bg-[var(--panel)] hover:border-[var(--line)] opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-1.5 py-0.5 rounded border border-[var(--line-subtle)] text-[10px] font-bold text-[var(--ink2)]">
                      [ {p.difficulty.toUpperCase()} ]
                    </span>
                    <span className="text-[11px] text-[var(--ink3)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.estimatedHours}h est.
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[var(--ink)] leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[var(--ink2)] mt-1 line-clamp-1 italic">
                    {p.subtitle}
                  </p>

                  <div className="mt-2 text-[10px] text-[var(--ink3)]">
                    <span>o--o {p.nodeByNodeSteps.length} nodes configured</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Detail Panel */}
        <div className="lg:col-span-8 rounded-xl border-2 border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7 space-y-7 shadow-sm">
          {/* Title & Download Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[var(--line-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--line-subtle)] bg-[var(--panel2)] text-[var(--ink)]">
                  [ {activeProject.stage.toUpperCase()} ]
                </span>
                <span className="text-xs text-[var(--ink3)]">
                  // {activeProject.estimatedHours} HOURS ESTIMATE
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-[var(--ink)]">
                {activeProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink2)] mt-1 italic">
                {activeProject.subtitle}
              </p>
            </div>

            <button
              onClick={() => handleDownloadJson(activeProject)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded border-2 border-[var(--line)] bg-[var(--line)] text-[var(--bg)] font-bold text-xs hover:opacity-90 transition-all shrink-0 cursor-pointer shadow-sm"
            >
              {downloadSuccess === activeProject.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>[ WORKFLOW DOWNLOADED ✓ ]</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>[ DOWNLOAD WORKFLOW JSON ]</span>
                </>
              )}
            </button>
          </div>

          {/* Business Problem & Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                // The Business Challenge
              </span>
              <p className="text-xs text-[var(--ink)] leading-relaxed">{activeProject.problemStatement}</p>
            </div>
            <div className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">
                // Enterprise ROI & Value
              </span>
              <p className="text-xs text-[var(--ink)] leading-relaxed">{activeProject.businessValue}</p>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
              // SOLUTION TOPOLOGY & DATA FLOW
            </span>
            <MermaidDiagram chart={activeProject.architectureDiagramMermaid} caption={`${activeProject.title} Architecture Map`} />
          </div>

          {/* Node Construction Steps */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
              // NODE ASSEMBLY SPECIFICATIONS
            </span>
            <div className="border border-[var(--line-subtle)] rounded-lg overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-[var(--panel2)] text-[var(--ink2)] text-[10px] border-b border-[var(--line-subtle)]">
                  <tr>
                    <th className="p-2.5">Node Name</th>
                    <th className="p-2.5">Purpose</th>
                    <th className="p-2.5">Key Configuration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line-subtle)] text-[var(--ink)]">
                  {activeProject.nodeByNodeSteps.map((step, idx) => (
                    <tr key={idx} className="hover:bg-[var(--panel2)] transition-colors">
                      <td className="p-2.5 font-bold whitespace-nowrap">{step.nodeName}</td>
                      <td className="p-2.5 text-xs text-[var(--ink2)]">{step.purpose}</td>
                      <td className="p-2.5 text-[11px] text-[var(--accent)]">{step.config}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sample Input & Expected Output */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink3)] block">
              // SAMPLE PAYLOAD VERIFICATION
            </span>
            <JsonInspector
              beforeTitle="Input Payload"
              beforeData={activeProject.sampleData}
              afterTitle="Verified Resulting Payload"
              afterData={activeProject.expectedOutput}
            />
          </div>

          {/* Testing & Security Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] block">
                // Verification Protocol:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-xs text-[var(--ink2)]">
                {activeProject.testingInstructions.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-[var(--line-subtle)] bg-[var(--panel2)] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] block">
                // Definition of Done:
              </span>
              <ul className="space-y-1 text-xs text-[var(--ink)]">
                {activeProject.definitionOfDone.map((d, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
