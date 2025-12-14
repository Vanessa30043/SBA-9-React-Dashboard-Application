import type { Task, FilterOptions, Priority } from "../types";



export const generateId = (): string => {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return timePart + "-" + randomPart;
};


export const formatDate = (iso?: string): string => {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  return date.toLocaleDateString();
};


export const validateTask = (
  task: Partial<Task>
): { ok: boolean; errors: string[] } => {
  let errors: string[] = [];

  if (!task.title || task.title.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (task.title && task.title.length > 100) {
    errors.push("Title must be under 100 characters.");
  }

  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.push("Due date is invalid.");
    }
  }

  return {
    ok: errors.length === 0,
    errors: errors,
  };
};



export const filterTasks = (
  tasks: Task[],
  filters: FilterOptions
): Task[] => {
  let results: Task[] = [];

  /* Copy tasks into results */
  for (let i = 0; i < tasks.length; i++) {
    results.push(tasks[i]);
  }

  /* Search filter */
  if (filters.search.trim() !== "") {
    let query = filters.search.toLowerCase();
    let searched: Task[] = [];

    for (let i = 0; i < results.length; i++) {
      const titleMatch = results[i].title
        .toLowerCase()
        .includes(query);

    }

    results = searched;
  }

  /* Status filter */
  if (filters.status !== "all") {
    let statusFiltered: Task[] = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i].status === filters.status) {
        statusFiltered.push(results[i]);
      }
    }

    results = statusFiltered;
  }

  /* Priority filter */
  if (filters.priority !== "all") {
    let priorityFiltered: Task[] = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i].priority === filters.priority) {
        priorityFiltered.push(results[i]);
      }
    }

    results = priorityFiltered;
  }

  /* Sorting */
  const direction = filters.sortDir === "desc" ? -1 : 1;

  if (filters.sortBy === "title") {
    results.sort((a, b) => {
      return a.title.localeCompare(b.title) * direction;
    });
  }

  if (filters.sortBy === "priority") {
    const priorityOrder: Record<Priority, number> = {
      high: 1,
      medium: 2,
      low: 3,
    };

    results.sort((a, b) => {
      return (
        (priorityOrder[a.priority] - priorityOrder[b.priority]) *
        direction
      );
    });
  }

  if (filters.sortBy === "due") {
    results.sort((a, b) => {
      const aDate = a.dueDate
        ? new Date(a.dueDate).getTime()
        : Infinity;

      const bDate = b.dueDate
        ? new Date(b.dueDate).getTime()
        : Infinity;

      return (aDate - bDate) * direction;
    });
  }

  if (filters.sortBy === "created") {
    results.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return (aTime - bTime) * direction;
    });
  }

  return results;
};
