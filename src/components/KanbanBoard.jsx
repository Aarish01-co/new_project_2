import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import EmptyState from './EmptyState';
import { Columns, LayoutGrid } from 'lucide-react';

export default function KanbanBoard({
  tasks,
  totalTaskCount,
  hasActiveFilters,
  onResetFilters,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveStatus,
  onDropTask,
}) {
  // Mobile active tab view ('All' or specific column)
  const [mobileActiveTab, setMobileActiveTab] = useState('All');

  // Filter tasks by status for each column
  const todoTasks = tasks.filter((t) => t.status === 'Todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  // Case 1: Total tasks on board is 0
  if (totalTaskCount === 0) {
    return (
      <EmptyState
        variant="no-tasks"
        title="No tasks yet"
        description="Your Kanban board is currently empty. Start planning your workflow by adding your first task!"
        actionLabel="Create your first task"
        onAction={() => onAddTask('Todo')}
      />
    );
  }

  // Case 2: Filters active but 0 matching results
  if (tasks.length === 0 && hasActiveFilters) {
    return (
      <EmptyState
        variant="no-results"
        title="No tasks found"
        description="No tasks match your current search query and filters. Reset your filters to see all tasks."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  const columns = [
    { id: 'Todo', title: 'Todo', status: 'Todo', tasks: todoTasks, count: todoTasks.length },
    { id: 'In Progress', title: 'In Progress', status: 'In Progress', tasks: inProgressTasks, count: inProgressTasks.length },
    { id: 'Completed', title: 'Completed', status: 'Completed', tasks: completedTasks, count: completedTasks.length },
  ];

  return (
    <div className="w-full">
      {/* Mobile Column Switcher (Visible on small screens) */}
      <div className="lg:hidden mb-4 flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl">
          <button
            onClick={() => setMobileActiveTab('All')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileActiveTab === 'All'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Columns ({tasks.length})
          </button>
          {columns.map((col) => (
            <button
              key={col.id}
              onClick={() => setMobileActiveTab(col.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mobileActiveTab === col.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {col.title} ({col.count})
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        {columns.map((col) => {
          // If on mobile and a specific tab is chosen, only render that column
          if (mobileActiveTab !== 'All' && mobileActiveTab !== col.id) {
            return null;
          }

          return (
            <div key={col.id} className="w-full">
              <KanbanColumn
                title={col.title}
                status={col.status}
                tasks={col.tasks}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onMoveStatus={onMoveStatus}
                onDropTask={onDropTask}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
