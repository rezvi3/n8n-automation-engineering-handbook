import React, { useMemo } from 'react';

interface ScribbleRingProps {
  className?: string;
  color?: string;
}

export const ScribbleRing: React.FC<ScribbleRingProps> = ({ 
  className = '',
  color
}) => {
  const { path1, path2 } = useMemo(() => {
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const tilt = rnd(-0.07, 0.07);
    const start = rnd(0, Math.PI * 2);
    const sweep = Math.PI * 2 * rnd(1.05, 1.15);
    const rx = rnd(46, 50);
    const ry = rnd(37, 43);
    const cx = 50 + rnd(-2, 2);
    const cy = 50 + rnd(-2, 2);
    const drift = rnd(-0.05, 0.05);
    const N = 48;

    const pts: [number, number][] = [];
    for (let i = 0; i <= N; i++) {
      const k = i / N;
      const t = start + sweep * k;
      const w = (1 + drift * k) * (1 + 0.035 * Math.sin(t * 2.7 + start) + rnd(-0.01, 0.01));
      const x = rx * w * Math.cos(t);
      const y = ry * w * Math.sin(t);
      pts.push([
        cx + x * Math.cos(tilt) - y * Math.sin(tilt),
        cy + x * Math.sin(tilt) + y * Math.cos(tilt)
      ]);
    }

    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const m = [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2];
      d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
    }
    d += ` L${pts[N][0].toFixed(1)} ${pts[N][1].toFixed(1)}`;

    return {
      path1: d,
      path2: d
    };
  }, []);

  return (
    <svg 
      className={`scribble-ring ${className}`}
      viewBox="0 0 100 100" 
      preserveAspectRatio="none" 
      aria-hidden="true"
      style={{ '--len': '480px' } as React.CSSProperties}
    >
      <path 
        d={path1} 
        style={color ? { stroke: color } : undefined} 
      />
      <path 
        d={path2} 
        transform="translate(0.8, -0.6)" 
        style={color ? { stroke: color } : undefined} 
      />
    </svg>
  );
};
