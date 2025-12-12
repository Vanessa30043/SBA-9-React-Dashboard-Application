// src/utils/taskUtils.ts
import type { Task, FilterOptions, Priority } from '../types';

export const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const formatDate = (iso?: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString();
};

export const validateTask = (t: Partial<Task>): { ok: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!t.title || t.title.trim().length === 0) errors.push('Title is required.');
  if (t.title && t.title.length > 100) errors.push('Title must be under 100 characters.');
  if (t.dueDate) {
    const due = new Date(t.dueDate);
    if (isNaN(due.getTime())) errors.push('Due date is invalid.');
  }
  return { ok: errors.length === 0, errors };
};

export const filterTasks = (tasks: Task[], f: FilterOptions): Task[] => {
  let res = tasks.slice();

  if (f.search && f.search.trim()) {
    const q = f.search.trim().toLowerCase();
    res = res.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }

  if (f.status && f.status !== 'all') {
    res = res.filter((t) => t.status === f.status);
  }

  if (f.priority && f.priority !== 'all') {
    res = res.filter((t) => t.priority === f.priority);
  }

  // Sorting
  const dir = f.sortDir === 'desc' ? -1 : 1;
  if (f.sortBy === 'due') {
    res.sort((a, b) => {
      const av = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bv = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return (av - bv) * dir;
    });
  } else if (f.sortBy === 'priority') {
    const order: Record<Priority, number> = { high: 1, medium: 2, low: 3 };
    res.sort((a, b) => (order[a.priority] - order[b.priority]) * dir);
  } else if (f.sortBy === 'title') {
    res.sort((a, b) => a.title.localeCompare(b.title) * dir);
  } else {
    // default: created
    res.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir);
  }

  return res;
};
