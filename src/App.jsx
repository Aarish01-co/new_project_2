import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import { useTasks } from './hooks/useTasks';
import { useToast } from './hooks/useToast';

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetToSample,
    stats,
  } = useTasks();

  const { toasts, addToast, removeToast } = useToast();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalDefaultStatus, setModalDefaultStatus] = useState('Todo');

  // Confirm delete dialog state
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Filter tasks based on search, priority, and status
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search Query (matches title or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) {
          return false;
        }
      }

      // 2. Priority Filter
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
        return false;
      }

      // 3. Status Filter
      if (statusFilter !== 'All' && task.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || priorityFilter !== 'All' || statusFilter !== 'All'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriorityFilter('All');
    setStatusFilter('All');
    addToast('Filters reset to default', 'info');
  };

  // Open modal for new task
  const handleOpenCreateModal = (defaultColStatus = 'Todo') => {
    setEditingTask(null);
    setModalDefaultStatus(defaultColStatus);
    setIsModalOpen(true);
  };

  // Open modal for editing existing task
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handle task modal submit (create or edit)
  const handleModalSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      addToast(`Updated "${taskData.title}"`, 'success');
    } else {
      addTask(taskData);
      addToast(`Created "${taskData.title}"`, 'success');
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Handle delete request
  const handleDeleteRequest = (task) => {
    setTaskToDelete(task);
    setIsConfirmOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      addToast(`Deleted task "${taskToDelete.title}"`, 'info');
      setTaskToDelete(null);
      setIsConfirmOpen(false);
    }
  };

  // Handle status move (via action menu or drag-and-drop)
  const handleMoveStatus = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    moveTask(taskId, newStatus);
    addToast(`Moved "${task.title}" to ${newStatus}`, 'info');
  };

  // Handle drag-and-drop onto column
  const handleDropTask = (taskId, targetStatus) => {
    handleMoveStatus(taskId, targetStatus);
  };

  // Reset to sample tasks
  const handleResetToSample = () => {
    resetToSample();
    addToast('Board reset to sample demonstration tasks', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      {/* Dashboard Top Header & Filters */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        onResetToSample={handleResetToSample}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Dashboard Statistics Bar */}
        <DashboardStats
          stats={stats}
          activeStatusFilter={statusFilter}
          onStatusFilterClick={(statusId) => {
            if (statusFilter === statusId) {
              setStatusFilter('All');
            } else {
              setStatusFilter(statusId);
            }
          }}
        />

        {/* Filter Results Summary Banner (if filters are active) */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-orange-50/70 border border-orange-200/60 rounded-xl px-4 py-2.5 text-xs text-orange-900 animate-fadeIn">
            <span className="font-medium">
              Showing <strong className="font-bold">{filteredTasks.length}</strong> of{' '}
              <strong className="font-bold">{tasks.length}</strong> total tasks matching your filters.
            </span>
            <button
              onClick={handleResetFilters}
              className="font-bold underline hover:text-orange-700 transition-colors ml-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Kanban Board Columns & Task Cards */}
        <KanbanBoard
          tasks={filteredTasks}
          totalTaskCount={tasks.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          onAddTask={handleOpenCreateModal}
          onEditTask={handleOpenEditModal}
          onDeleteTask={handleDeleteRequest}
          onMoveStatus={handleMoveStatus}
          onDropTask={handleDropTask}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/70 bg-white py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TaskFlow • Modern SaaS Kanban Task Board</span>
          <span className="text-[11px] text-slate-400">
            LocalStorage Sync Active • Real-time Drag & Drop
          </span>
        </div>
      </footer>

      {/* Task Create / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTask}
        defaultStatus={modalDefaultStatus}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Task?"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This task will be permanently removed from your Kanban board.`
            : 'Are you sure you want to delete this task?'
        }
        confirmLabel="Delete Task"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setTaskToDelete(null);
        }}
      />

      {/* Floating Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
