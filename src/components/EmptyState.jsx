import React from 'react';
import { ClipboardList, SearchX, Plus, RotateCcw } from 'lucide-react';

export default function EmptyState({
  variant = 'no-tasks',
  onAction,
  actionLabel,
  title,
  description,
}) {
  if (variant === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 shadow-sm">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
          {title || 'No tasks found'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-5 leading-relaxed">
          {description || "We couldn't find any tasks matching your current search and filters. Try adjusting your search query or reset the filters."}
        </p>
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{actionLabel || 'Clear all filters'}</span>
          </button>
        )}
      </div>
    );
  }

  if (variant === 'column-empty') {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-200/80 rounded-xl bg-slate-50/50 my-2">
        <p className="text-xs font-medium text-slate-400 mb-2">No tasks in this column</p>
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add task here</span>
          </button>
        )}
      </div>
    );
  }

  // Default: Entire board has no tasks
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto my-12 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 shadow-sm">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
        {title || 'No tasks yet'}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
        {description || 'Get started by creating your first task to plan, track, and organize your work.'}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-sm shadow-orange-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{actionLabel || 'Create your first task'}</span>
        </button>
      )}
    </div>
  );
}
