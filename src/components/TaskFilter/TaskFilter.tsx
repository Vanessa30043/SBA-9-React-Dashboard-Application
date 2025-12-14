// src/components/TaskFilter/TaskFilter.tsx
import React from "react";
import type { FilterOptions, Priority, Status } from "../../types";

type Props = {
  value: FilterOptions;
  onChange: (f: FilterOptions) => void;
  clearFilters?: () => void;
};

export const TaskFilter: React.FC<Props> = ({
  value,
  onChange,
  clearFilters,
}) => {
  const update = (patch: Partial<FilterOptions>) =>
    onChange({ ...value, ...patch });

  return (
    <div style={{ border: "1px solid #eee", padding: 10, borderRadius: 8 }}>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Search tasks..."
          value={value.search}
          onChange={(e) => update({ search: e.target.value })}
          style={{ width: "100%", padding: 6 }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <label>
          Status
          <select
            value={value.status ?? "all"}
            onChange={(e) =>
              update({ status: e.target.value as Status | "all" })
            }
            style={{ marginLeft: 6 }}
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label>
          Priority
          <select
            value={value.priority ?? "all"}
            onChange={(e) =>
              update({ priority: e.target.value as Priority | "all" })
            }
            style={{ marginLeft: 6 }}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label>
          Sort
          <select
            value={value.sortBy ?? "created"}
            onChange={(e) =>
              update({ sortBy: e.target.value as FilterOptions["sortBy"] })
            }
            style={{ marginLeft: 6 }}
          >
            <option value="created">Created</option>
            <option value="due">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>

        <label>
          Direction
          <select
            value={value.sortDir ?? "asc"}
            onChange={(e) =>
              update({ sortDir: e.target.value as "asc" | "desc" })
            }
            style={{ marginLeft: 6 }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => clearFilters && clearFilters()}>Clear</button>
        </div>
      </div>
    </div>
  );
};
