// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import type { Task, FilterOptions } from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import { filterTasks, generateId } from "../../utils/taskUtils";

const STORAGE_KEY = "task_dashboard_v1";

const createSampleTasks = (): Task[] => {
  return [
    {
      id: generateId(),
      title: "Welcome! Edit or delete me",
      description: "This is your first task",
      priority: "medium",
      status: "todo",
      createdAt: new Date().toISOString(),
      dueDate: undefined,
    },
  ];
};

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return createSampleTasks();
  });

  const [filter, setFilter] = useState<FilterOptions>({
    search: "",
    status: "all",
    priority: "all",
    sortBy: "created",
    sortDir: "asc",
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? "#111" : "#fff";
    document.body.style.color = darkTheme ? "#f5f5f5" : "#111";
  }, [darkTheme]);

  const visibleTasks = filterTasks(tasks, filter);

  let totalTasks = tasks.length;
  let completedTasks = 0;
  let todoTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "done") {
      completedTasks++;
    } else {
      todoTasks++;
    }
  }

  const addOrUpdateTask = (task: Task) => {
    let updatedTasks: Task[] = [];
    let found = false;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === task.id) {
        updatedTasks.push(task);
        found = true;
      } else {
        updatedTasks.push(tasks[i]);
      }
    }

    if (!found) {
      updatedTasks = [task, ...tasks];
    }

    setTasks(updatedTasks);
    setEditingTask(null);
    setShowForm(false);
  };

  const deleteTask = (id: string) => {
    let remainingTasks: Task[] = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        remainingTasks.push(tasks[i]);
      }
    }

    setTasks(remainingTasks);
  };

  const toggleTaskStatus = (id: string) => {
    let updatedTasks: Task[] = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        const updatedTask: Task = {
          ...tasks[i],
          status: tasks[i].status === "done" ? "todo" : "done",
        };
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(tasks[i]);
      }
    }

    setTasks(updatedTasks);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const clearFilters = () => {
    setFilter({
      search: "",
      status: "all",
      priority: "all",
      sortBy: "created",
      sortDir: "asc",
    });
  };

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Task Management Dashboard</h1>

        <div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingTask(null);
            }}
          >
            {showForm ? "Close Form" : "Add Task"}
          </button>

          <label style={{ marginLeft: 12 }}>
            <input
              type="checkbox"
              checked={darkTheme}
              onChange={(e) => setDarkTheme(e.target.checked)}
            />
            Dark Mode
          </label>
        </div>
      </header>

      <section
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}
      >
        <main>
          <TaskFilter
            value={filter}
            onChange={setFilter}
            clearFilters={clearFilters}
          />

          {showForm && (
            <TaskForm
              initial={editingTask ?? undefined}
              onSave={addOrUpdateTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          )}

          <TaskList
            tasks={visibleTasks}
            onToggleStatus={toggleTaskStatus}
            onDelete={deleteTask}
            onEdit={startEditing}
          />
        </main>

        <aside style={{ border: "1px solid #ddd", padding: 12 }}>
          <h3>Task Stats</h3>
          <p>Total: {totalTasks}</p>
          <p>Completed: {completedTasks}</p>
          <p>To Do: {todoTasks}</p>
        </aside>
      </section>
    </div>
  );
};
