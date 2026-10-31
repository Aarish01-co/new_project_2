import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderColor = 'border-emerald-200 bg-white';
        let barColor = 'bg-emerald-500';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderColor = 'border-rose-200 bg-white';
          barColor = 'bg-rose-500';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
          borderColor = 'border-amber-200 bg-white';
          barColor = 'bg-amber-500';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderColor = 'border-blue-200 bg-white';
          barColor = 'bg-blue-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border shadow-lg ${borderColor} text-slate-800 animate-slideInRight transition-all duration-200`}
          >
            <div className={`absolute top-0 left-0 bottom-0 w-1 ${barColor}`} />
            <div className="pt-0.5">{icon}</div>
            <div className="flex-1 text-sm font-medium pr-2 leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
