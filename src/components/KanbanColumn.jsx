import React, { useState } from 'react';
import { Plus, ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

export default function KanbanColumn({
  title,
  status,
  tasks = [],
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveStatus,
  onDropTask,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  // Column specific visual configurations
  const columnConfigs = {
    Todo: {
      accentColor: 'border-t-amber-500',
      dotColor: 'bg-amber-500',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: <ListTodo className="w-4 h-4 text-amber-600" />,
      emptyMessage: 'No tasks waiting to be started',
    },
    'In Progress': {
      accentColor: 'border-t-blue-500',
      dotColor: 'bg-blue-500',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: <Clock className="w-4 h-4 text-blue-600" />,
      emptyMessage: 'No tasks currently in progress',
    },
    Completed: {
      accentColor: 'border-t-emerald-500',
      dotColor: 'bg-emerald-500',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      emptyMessage: 'No finished tasks yet',
    },
  }[status] || {
    accentColor: 'border-t-slate-500',
    dotColor: 'bg-slate-500',
    badgeColor: 'bg-slate-100 text-slate-800',
    icon: <ListTodo className="w-4 h-4 text-slate-600" />,
    emptyMessage: 'No tasks in this column',
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only set false if leaving the actual column container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col bg-slate-100/60 rounded-2xl border-2 transition-all duration-200 min-h-[500px] h-full ${
        isDragOver
          ? 'border-dashed border-orange-400 bg-orange-50/40 ring-4 ring-orange-100/60'
          : 'border-slate-200/80 shadow-sm'
      }`}
    >
      {/* Column Header */}
      <div className={`p-4 border-b border-slate-200/70 bg-white rounded-t-2xl border-t-4 ${columnConfigs.accentColor} flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${columnConfigs.dotColor}`} />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            {title}
          </h2>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${columnConfigs.badgeColor}`}>
            {tasks.length}
          </span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => onAddTask(status)}
          className="p-1 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          title={`Add new task to ${title}`}
          aria-label={`Add new task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Column Task Cards List */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col gap-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <EmptyState
            variant="column-empty"
            onAction={() => onAddTask(status)}
          />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMoveStatus={onMoveStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}
