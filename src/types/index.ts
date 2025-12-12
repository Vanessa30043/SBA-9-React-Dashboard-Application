// src/types/index.ts
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  createdAt: string; // ISO date
  dueDate?: string; // optional ISO date
}

export interface FilterOptions {
  search: string;
  status?: Status | 'all';
  priority?: Priority | 'all';
  sortBy?: 'created' | 'due' | 'priority' | 'title';
  sortDir?: 'asc' | 'desc';
}
