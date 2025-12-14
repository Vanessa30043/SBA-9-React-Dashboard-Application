import React from "react";
import type { FilterOptions } from "../../types";

interface TaskFilterProps {
  value: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  clearFilters: () => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  value,
  onChange,
  clearFilters,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      search: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...value,
      status: e.target.value as FilterOptions["status"],
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...value,
      priority: e.target.value as FilterOptions["priority"],
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
      }}
    >
      <h3>Filters</h3>

      <div style={{ marginBottom: 8 }}>
        <label>
          Search:
          <input
            type="text"
            value={value.search}
            onChange={handleSearchChange}
            style={{ marginLeft: 6 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Status:
          <select
            value={value.status}
            onChange={handleStatusChange}
            style={{ marginLeft: 6 }}
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Priority:
          <select
            value={value.priority}
            onChange={handlePriorityChange}
            style={{ marginLeft: 6 }}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};
