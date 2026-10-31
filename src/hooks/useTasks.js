import { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_TASKS } from '../data/sampleTasks';

const STORAGE_KEY = 'taskflow_tasks_v1';

export function useTasks() {
  // Initialize tasks from LocalStorage or fallback to sample tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err);
    }
    // Return sample tasks on initial run
    return INITIAL_TASKS;
  });

  // Persist tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // Add task
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'Todo',
      dueDate: taskData.dueDate || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  // Update existing task
  const updateTask = useCallback((id, updatedData) => {
    let updatedTask = null;
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          updatedTask = {
            ...task,
            ...updatedData,
            title: updatedData.title !== undefined ? updatedData.title.trim() : task.title,
            description: updatedData.description !== undefined ? updatedData.description.trim() : task.description,
            updatedAt: new Date().toISOString(),
          };
          return updatedTask;
        }
        return task;
      })
    );
    return updatedTask;
  }, []);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Move task to a new status (and optional target index)
  const moveTask = useCallback((taskId, newStatus, targetIndex = null) => {
    setTasks((prev) => {
      const taskIndex = prev.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;

      const currentTask = prev[taskIndex];
      // If status didn't change and no reordering requested, return
      if (currentTask.status === newStatus && targetIndex === null) {
        return prev;
      }

      const updatedTask = {
        ...currentTask,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      // Filter out original task
      const remaining = prev.filter((t) => t.id !== taskId);

      if (targetIndex === null) {
        // Append to the end of target column tasks
        return [...remaining, updatedTask];
      }

      // If target index within column is provided:
      const columnTasks = remaining.filter((t) => t.status === newStatus);
      const otherTasks = remaining.filter((t) => t.status !== newStatus);

      columnTasks.splice(targetIndex, 0, updatedTask);
      return [...otherTasks, ...columnTasks];
    });
  }, []);

  // Reorder task within the same status or across columns
  const reorderTasks = useCallback((sourceId, targetId, newStatus) => {
    setTasks((prev) => {
      const sourceIndex = prev.findIndex((t) => t.id === sourceId);
      if (sourceIndex === -1) return prev;

      const sourceTask = {
        ...prev[sourceIndex],
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      const withoutSource = prev.filter((t) => t.id !== sourceId);
      const targetIndex = withoutSource.findIndex((t) => t.id === targetId);

      if (targetIndex === -1) {
        return [...withoutSource, sourceTask];
      }

      const updated = [...withoutSource];
      updated.splice(targetIndex, 0, sourceTask);
      return updated;
    });
  }, []);

  // Reset to initial sample tasks
  const resetToSample = useCallback(() => {
    setTasks(INITIAL_TASKS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Clear all tasks
  const clearAll = useCallback(() => {
    setTasks([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'Todo').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      todo,
      inProgress,
      completed,
      completionRate,
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
    resetToSample,
    clearAll,
    stats,
  };
}
