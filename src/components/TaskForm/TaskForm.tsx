// src/components/TaskForm/TaskForm.tsx
import React, { useEffect, useState } from "react";
import type { Task, Priority, Status } from "../../types";
import { generateId, validateTask } from "../../utils/taskUtils";

type Props = {
  onSave: (task: Task) => void;
  initial?: Partial<Task>;
  onCancel?: () => void;
};

const defaultState = (): Partial<Task> => ({
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
});

export const TaskForm: React.FC<Props> = ({ onSave, initial, onCancel }) => {
  const [form, setForm] = useState<Partial<Task>>(initial ?? defaultState());
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setForm(initial ?? defaultState());
  }, [initial]);

  const update = (patch: Partial<Task>) => setForm((s) => ({ ...s, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateTask(form);
    if (!check.ok) {
      setErrors(check.errors);
      return;
    }

    const task: Task = {
      id: (form.id as string) ?? generateId(),
      title: (form.title as string).trim(),
      description: form.description?.trim(),
      priority: (form.priority as Priority) ?? "medium",
      status: (form.status as Status) ?? "todo",
      createdAt: form.createdAt ?? new Date().toISOString(),
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
    };

    onSave(task);
    setForm(defaultState());
    setErrors([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}
    >
      <h3>{form.id ? "Edit Task" : "New Task"}</h3>
      {errors.length > 0 && (
        <div style={{ color: "red", marginBottom: 8 }}>
          {errors.map((err, i) => (
            <div key={i}>• {err}</div>
          ))}
        </div>
      )}
      <div style={{ marginBottom: 8 }}>
        <label>
          Title (required)
          <input
            value={form.title ?? ""}
            onChange={(e) => update({ title: e.target.value })}
            required
            maxLength={100}
            style={{
              display: "block",
              width: "100%",
              padding: 6,
              marginTop: 4,
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Description
          <textarea
            value={form.description ?? ""}
            onChange={(e) => update({ description: e.target.value })}
            style={{
              display: "block",
              width: "100%",
              padding: 6,
              marginTop: 4,
            }}
            rows={3}
          />
        </label>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <label>
          Priority
          <select
            value={form.priority ?? "medium"}
            onChange={(e) => update({ priority: e.target.value as Priority })}
            style={{ display: "block", marginTop: 4 }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Status
          <select
            value={form.status ?? "todo"}
            onChange={(e) => update({ status: e.target.value as Status })}
            style={{ display: "block", marginTop: 4 }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label>
          Due
          <input
            type="date"
            value={
              form.dueDate
                ? new Date(form.dueDate).toISOString().slice(0, 10)
                : ""
            }
            onChange={(e) =>
              update({
                dueDate: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : undefined,
              })
            }
            style={{ display: "block", marginTop: 4 }}
          />
        </label>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
