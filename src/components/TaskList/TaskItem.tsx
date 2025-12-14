import React from "react";
import type { Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  let backgroundColor = "#fff";

  if (task.status === "done") {
    backgroundColor = "#e6ffe6";
  }

  return (
    <li
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 8,
        borderRadius: 6,
        backgroundColor,
      }}
    >
      <h4>{task.title}</h4>

      {task.description && <p>{task.description}</p>}

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => onToggleStatus(task.id)}>
          {task.status === "done" ? "Mark Todo" : "Mark Done"}
        </button>

        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};
