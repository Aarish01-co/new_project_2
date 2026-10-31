import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Flag, CheckCircle2, Clock, ListTodo, AlertCircle } from 'lucide-react';

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultStatus = 'Todo',
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const titleInputRef = useRef(null);

  const isEditing = Boolean(initialData && initialData.id);

  // Sync state whenever modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setPriority(initialData.priority || 'Medium');
        setStatus(initialData.status || 'Todo');
        setDueDate(initialData.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setStatus(defaultStatus || 'Todo');
        // Default due date to 3 days from now
        const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
        setDueDate(defaultDate);
      }
      setErrors({});
      setTouched(false);

      // Auto-focus title input
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, initialData, defaultStatus]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validate()) {
      return;
    }

    onSubmit({
      title,
      description,
      priority,
      status,
      dueDate,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 z-10 animate-slideUp overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Update the details and status of this task'
                : 'Fill in the information below to add a new card to your board'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="task-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="task-title"
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (touched && errors.title) {
                    setErrors((prev) => ({ ...prev, title: null }));
                  }
                }}
                onBlur={() => {
                  setTouched(true);
                  validate();
                }}
                placeholder="e.g. Design user onboarding flow"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                  errors.title
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-200 bg-white hover:border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                }`}
              />
            </div>
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="task-desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Description <span className="text-slate-400 text-xs font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key requirements, acceptance criteria, or relevant links..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
            />
          </div>

          {/* Priority & Status in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                {[
                  { value: 'Low', label: 'Low', color: 'text-blue-700 bg-blue-50 border-blue-200 shadow-sm' },
                  { value: 'Medium', label: 'Medium', color: 'text-amber-700 bg-amber-50 border-amber-200 shadow-sm' },
                  { value: 'High', label: 'High', color: 'text-rose-700 bg-rose-50 border-rose-200 shadow-sm' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPriority(item.value)}
                    className={`text-xs py-1.5 font-medium rounded-lg text-center transition-all ${
                      priority === item.value
                        ? `${item.color} font-semibold border`
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="task-status" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="task-due-date" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Due Date
            </label>
            <div className="relative">
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 active:bg-orange-700 shadow-sm shadow-orange-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
