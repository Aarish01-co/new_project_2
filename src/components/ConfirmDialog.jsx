import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title = 'Delete Task',
  message = 'Are you sure you want to delete this task? This action cannot be undone.',
  confirmLabel = 'Delete Task',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 z-10 animate-slideUp"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 id="dialog-title" className="text-lg font-semibold text-slate-900 leading-snug">
              {title}
            </h3>
            <p id="dialog-desc" className="mt-2 text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 active:bg-rose-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
