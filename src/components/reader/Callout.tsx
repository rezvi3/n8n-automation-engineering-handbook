import React from 'react';
import { AlertCircle, ShieldAlert, Sparkles, Info } from 'lucide-react';

interface CalloutProps {
  type: 'tip' | 'warning' | 'security' | 'info';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const configs = {
    tip: {
      border: 'border-emerald-500/50',
      badge: 'text-emerald-500',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      defaultTitle: '// PRO ARCHITECT TIP'
    },
    warning: {
      border: 'border-amber-500/50',
      badge: 'text-amber-500',
      icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
      defaultTitle: '// COMMON PITFALL WARNING'
    },
    security: {
      border: 'border-rose-500/50',
      badge: 'text-rose-500',
      icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
      defaultTitle: '// SECURITY & HARDENING ALERT'
    },
    info: {
      border: 'border-blue-500/50',
      badge: 'text-blue-500',
      icon: <Info className="w-4 h-4 text-blue-500" />,
      defaultTitle: '// SPECIFICATION NOTE'
    }
  };

  const config = configs[type];

  return (
    <div className={`my-5 rounded-xl border-2 ${config.border} bg-[var(--panel)] p-4 sm:p-5 shadow-sm font-mono`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{config.icon}</div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <h5 className={`text-xs font-bold uppercase tracking-wider ${config.badge}`}>
            {title || config.defaultTitle}
          </h5>
          <div className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
