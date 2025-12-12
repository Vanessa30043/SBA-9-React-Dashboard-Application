// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { Task, FilterOptions } from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import { filterTasks, generateId } from "../../utils/taskUtils";

const STORAGE_KEY = "task_dashboard_v1";

const sampleTasks = (): Task[] => [
  {
    id: generateId(),
    title: "Welcome: edit or delete me",
    description: "This is an example task. Add your own to test.",
    priority: "medium",
    status: "todo",
    createdAt: new Date().toISOString(),
    dueDate: undefined,
  },
];

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
      return sampleTasks();
    } catch {
      return sampleTasks();
    }
  });

  const [filter, setFilter] = useState<FilterOptions>({
    search: "",
    status: "all",
    priority: "all",
    sortBy: "created",
    sortDir: "asc",
  });

  const [editing, setEditing] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [themeDark, setThemeDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", themeDark ? "dark" : "light");
    document.body.style.background = themeDark ? "#111" : "#fff";
    document.body.style.color = themeDark ? "#f5f5f5" : "#111";
  }, [themeDark]);

  const visible = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);

  const addOrUpdate = (task: Task) => {
    setTasks((prev) => {
      const idx = prev.findIndex((p) => p.id === task.id);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = task;
        return copy;
      }
      return [task, ...prev];
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleStatus = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = t.status === "done" ? "todo" : "done";
        return { ...t, status: next };
      })
    );

  const handleEdit = (task: Task) => {
    setEditing(task);
    setShowForm(true);
  };

  const clearFilters = () =>
    setFilter({
      search: "",
      status: "all",
      priority: "all",
      sortBy: "created",
      sortDir: "asc",
    });

  const exportData = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as Task[];
        // Basic validation: ensure items have id and title
        const valid = parsed.filter((p) => p && p.id && p.title);
        setTasks(valid);
      } catch (err) {
        alert("Import failed: invalid JSON.");
      }
    };
    reader.readAsText(file);
  };

  // stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const backlog = tasks.filter((t) => t.status === "todo").length;
    return { total, done, backlog };
  }, [tasks]);

  return (
    <div style={{ maxWidth: 980, margin: "20px auto", padding: 12 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Task Dashboard</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div>
            <button
              onClick={() => {
                setShowForm((s) => !s);
                setEditing(null);
              }}
            >
              {showForm ? "Hide Form" : "New Task"}
            </button>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={themeDark}
              onChange={(e) => setThemeDark(e.target.checked)}
            />
            Dark
          </label>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "1fr 320px",
          marginTop: 12,
        }}
      >
        <main>
          {/* Filters */}
          <TaskFilter
            value={filter}
            onChange={setFilter}
            clearFilters={clearFilters}
          />

          <div style={{ marginTop: 12 }}>
            {showForm && (
              <TaskForm
                initial={editing ?? undefined}
                onSave={addOrUpdate}
                onCancel={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
              />
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <TaskList
              tasks={visible}
              onToggleStatus={toggleStatus}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </main>

        <aside>
          <div
            style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
          >
            <h3>Stats</h3>
            <div>Total: {stats.total}</div>
            <div>Done: {stats.done}</div>
            <div>Backlog: {stats.backlog}</div>

            <hr style={{ margin: "8px 0" }} />

            <h4>Data</h4>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={exportData}>Export</button>
              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Import
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={(e) =>
                    importData(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </div>

            <hr style={{ margin: "8px 0" }} />
            <div style={{ fontSize: 12, color: "#666" }}>
              Tip: export before importing if you want a backup. Imported file
              should be an array of tasks.
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
