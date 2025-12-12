// src/components/TaskList/TaskItem.tsx
import React from "react";
import type { Task } from "../../types";
import { formatDate } from "../../utils/taskUtils";

type Props = {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

export const TaskItem: React.FC<Props> = ({
  task,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  const isDone = task.status === "done";
  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 8,
        marginBottom: 8,
        borderRadius: 6,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => onToggleStatus(task.id)}
        title="Mark done / not done"
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: "#555" }}>{task.description}</div>
        <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
          Priority: {task.priority} • Status: {task.status} • Created:{" "}
          {formatDate(task.createdAt)}
          {task.dueDate ? ` • Due: ${formatDate(task.dueDate)}` : ""}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};
