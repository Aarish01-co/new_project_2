import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterDropdown({
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Priority Filter */}
      <div className="relative">
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          aria-label="Filter tasks by priority"
          className={`h-9.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border appearance-none pr-8 cursor-pointer shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-100 ${
            priorityFilter !== 'All'
              ? 'bg-orange-50/60 border-orange-200 text-orange-900 font-semibold'
              : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
          }`}
        >
          <option value="All">All Priorities</option>
          <option value="High">🔴 High Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="Low">🔵 Low Priority</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter tasks by status"
          className={`h-9.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border appearance-none pr-8 cursor-pointer shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-100 ${
            statusFilter !== 'All'
              ? 'bg-orange-50/60 border-orange-200 text-orange-900 font-semibold'
              : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
          }`}
        >
          <option value="All">All Statuses</option>
          <option value="Todo">📋 Todo</option>
          <option value="In Progress">⚡ In Progress</option>
          <option value="Completed">✅ Completed</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>

      {/* Reset button when any filter or search is active */}
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 rounded-xl transition-colors shadow-sm"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
