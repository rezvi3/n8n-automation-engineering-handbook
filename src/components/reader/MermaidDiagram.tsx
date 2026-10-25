import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#0B0F19',
    primaryColor: '#3B82F6',
    primaryTextColor: '#F8FAFC',
    primaryBorderColor: '#60A5FA',
    lineColor: '#94A3B8',
    secondaryColor: '#10B981',
    tertiaryColor: '#1E293B',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  securityLevel: 'loose'
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, caption }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    const renderChart = async () => {
      try {
        setError(null);
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvg(renderedSvg);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Mermaid render error', err);
          setError('Failed to render diagram dynamically.');
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div className={`my-6 rounded-2xl border border-slate-700/60 bg-[#0e1422] p-3.5 sm:p-5 transition-all duration-200 shadow-xl ${isZoomed ? 'fixed inset-2 sm:inset-6 z-50 overflow-auto bg-slate-950 p-4 sm:p-8 border-slate-600' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-medium text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Interactive System Topology
        </span>
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          title={isZoomed ? "Close expanded view" : "Expand diagram full screen"}
        >
          {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isZoomed ? 'Close' : 'Full Screen'}</span>
        </button>
      </div>

      <div className="py-4 flex justify-start sm:justify-center items-center overflow-x-auto min-h-[160px] no-scrollbar">
        {error ? (
          <div className="text-amber-400 text-xs font-mono p-4 bg-amber-950/20 border border-amber-900/50 rounded">
            {error}
            <pre className="mt-2 text-slate-400">{chart}</pre>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full flex justify-start sm:justify-center [&>svg]:min-w-[420px] sm:[&>svg]:min-w-0 [&>svg]:max-w-none sm:[&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>

      {caption && (
        <p className="pt-2 text-center text-xs font-medium text-slate-400 border-t border-slate-800/80">
          {caption}
        </p>
      )}
    </div>
  );
};
