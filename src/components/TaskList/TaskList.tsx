// src/components/TaskList/TaskList.tsx
import React from "react";
import type { Task } from "../../types";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

export const TaskList: React.FC<Props> = ({
  tasks,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  if (tasks.length === 0) {
    return <div style={{ padding: 12 }}>No tasks to show.</div>;
  }

  return (
    <div>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
