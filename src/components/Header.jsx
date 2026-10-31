import React from 'react';
import { Plus, Kanban, Sparkles, RotateCcw } from 'lucide-react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

export default function Header({
  onOpenCreateModal,
  searchQuery,
  onSearchChange,
  onClearSearch,
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  onResetFilters,
  hasActiveFilters,
  onResetToSample,
}) {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Navbar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Kanban className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  Task<span className="text-orange-500">Flow</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 rounded-md">
                  Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Modern SaaS Task Workspace</p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Demo Reset Button */}
            <button
              onClick={onResetToSample}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
              title="Reset tasks to initial sample tasks"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset Demo Tasks</span>
              <span className="sm:hidden">Reset</span>
            </button>

            {/* Primary Add Task Button */}
            <button
              onClick={() => onOpenCreateModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-sm shadow-orange-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Title & Filter Controls Row */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              My Kanban Board
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Organize, track, and streamline team tasks across columns
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full md:w-auto">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onClear={onClearSearch}
            />

            <FilterDropdown
              priorityFilter={priorityFilter}
              onPriorityChange={onPriorityChange}
              statusFilter={statusFilter}
              onStatusChange={onStatusChange}
              onResetFilters={onResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
