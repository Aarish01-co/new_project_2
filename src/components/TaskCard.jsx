import React, { useState } from 'react';
import {
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  GripVertical,
  Clock,
  CheckCircle2,
  ListTodo,
  AlertCircle,
  ArrowRightCircle,
} from 'lucide-react';
import { formatDueDate, isOverdue, isDueToday } from '../utils/dateUtils';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onMoveStatus,
  isDragging = false,
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const overdue = isOverdue(task.dueDate, task.status);
  const dueToday = isDueToday(task.dueDate, task.status);

  // Subtle priority styles
  const priorityStyles = {
    High: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200/70',
      dot: 'bg-rose-500',
    },
    Medium: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200/70',
      dot: 'bg-amber-500',
    },
    Low: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200/70',
      dot: 'bg-blue-500',
    },
  }[task.priority] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    // Add visual dragging class
    setTimeout(() => {
      e.target.classList.add('opacity-40');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-40');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group relative bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
        isDragging ? 'opacity-40 ring-2 ring-orange-400' : ''
      }`}
    >
      {/* Top row: Priority badge, Drag handle & Action buttons */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Drag Handle Grip */}
          <div
            className="text-slate-300 group-hover:text-slate-500 -ml-1 transition-colors"
            title="Drag to reorder or move column"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Priority Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${priorityStyles.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priorityStyles.dot}`} />
            {task.priority}
          </span>
        </div>

        {/* Quick Actions (Edit, Delete, Move) */}
        <div className="flex items-center gap-1">
          {/* Move Status Dropdown / Action Menu */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu((prev) => !prev)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Move to another status"
              aria-label="Change status"
            >
              <ArrowRightCircle className="w-4 h-4" />
            </button>

            {showStatusMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowStatusMenu(false)}
                />
                <div className="absolute right-0 top-7 z-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 w-44 text-xs font-medium text-slate-700 animate-fadeIn">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Move Task To
                  </div>
                  {['Todo', 'In Progress', 'Completed'].map((s) => (
                    <button
                      key={s}
                      disabled={task.status === s}
                      onClick={() => {
                        onMoveStatus(task.id, s);
                        setShowStatusMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors ${
                        task.status === s
                          ? 'text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'hover:bg-orange-50 hover:text-orange-900'
                      }`}
                    >
                      <span>{s}</span>
                      {task.status === s && (
                        <span className="text-[10px] font-semibold text-slate-400">(Current)</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task)}
            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="text-sm font-semibold text-slate-900 leading-snug tracking-tight mb-1.5">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
          {task.description}
        </p>
      )}

      {/* Card Footer: Due Date & Status Indicator */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        {/* Due Date Indicator */}
        {task.dueDate ? (
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
              overdue
                ? 'bg-rose-50 text-rose-600 border border-rose-200/60 font-semibold'
                : dueToday
                ? 'bg-amber-50 text-amber-700 border border-amber-200/60 font-semibold'
                : 'text-slate-500 bg-slate-50 border border-slate-200/40'
            }`}
            title={overdue ? 'Task is overdue!' : dueToday ? 'Task is due today!' : 'Due date'}
          >
            {overdue ? (
              <AlertCircle className="w-3 h-3 text-rose-500" />
            ) : (
              <Calendar className="w-3 h-3 text-slate-400" />
            )}
            <span>
              {overdue ? 'Overdue: ' : dueToday ? 'Due Today' : ''}
              {!dueToday && formatDueDate(task.dueDate)}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-slate-300 italic">No due date</span>
        )}

        {/* Current Column Indicator */}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {task.status}
        </span>
      </div>
    </div>
  );
}
