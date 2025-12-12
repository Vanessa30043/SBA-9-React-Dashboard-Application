\*\*

# React Task Management Dashboard

**Lists, Keys, and Conditionals**

## Overview

This project is a **Task Management Dashboard** built with **React** and **TypeScript**. Users can:

- View a list of tasks
- Add, edit, or delete tasks
- Filter tasks by status and priority
- See visual cues for task states using badges, colors, and avatars

The application emphasizes **dynamic list rendering, proper key management, conditional rendering, and reusable component composition**. It also includes a **cute anime-inspired UI** with pastel colors, rounded cards, and sticker images.

---

## What This Project Helped Me Learn

Through building this project, I practiced:

- Rendering dynamic lists of tasks using `.map()`
- Assigning unique keys for list elements
- Creating TypeScript interfaces for tasks, props, and filters
- Applying conditional styling for task status and priority
- Filtering and searching tasks dynamically
- Handling events like adding, deleting, and updating tasks
- Passing props between multiple components
- Structuring a React project with reusable, type-safe components
- Designing a visually appealing UI with stickers, soft colors, and rounded elements

---

## Project Structure

`task-dashboard/
│
├── src/
│   ├── components/
│   │   ├── TaskList/ TaskList.tsx
│   │   ├── TaskItem/ TaskItem.tsx
│   │   ├── TaskFilter/ TaskFilter.tsx
│   │   └── Dashboard/ Dashboard.tsx
│   ├── types/ index.ts
│   ├── utils/ taskUtils.ts
│   ├── App.tsx
│   └── main.tsx
│
├── public/assets/   # sticker and avatar images
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts`

- `components/` → all UI components for tasks and dashboard
- `types/` → TypeScript interfaces
- `utils/` → filtering, sorting, and validation helper functions
- `public/assets/` → images for anime-style UI

---

## Tools & Technologies

- **React** – Component-based UI
- **TypeScript** – Type safety and structured data
- **Vite** – Fast development environment
- **Node.js + npm** – Dependency management
- **CSS / Google Fonts / stickers** – For cute anime-inspired UI

---

## How to Run This Project

1.  Clone or download the project
2.  Install dependencies:

`npm install`

3.  Run the development server:

`npm run dev`

4.  Open the URL in your browser (usually `http://localhost:5173`)

---

## Components

### TaskList

- Renders a dynamic list of tasks
- Handles task updates and deletions
- Applies conditional styling based on status and priority

### TaskItem

- Displays individual task details with avatar/sticker
- Shows badges for priority and status
- Handles edit and delete events

### TaskFilter

- Filters tasks by status and priority
- Sends filter updates to the parent Dashboard component

### Dashboard

- Combines TaskList, TaskItem, and TaskFilter
- Shows task statistics
- Responsive layout for desktop and mobile
- Includes cute stickers and pastel UI

---

## TypeScript Interfaces

- `Task` – Represents a task object
- `TaskListProps` – Props for TaskList component
- `TaskItemProps` – Props for TaskItem component
- `TaskFilterProps` – Props for TaskFilter component

---

## Features Implemented

- Dynamic list rendering with `.map()`
- Conditional rendering for task states and priority
- Task addition, deletion, and status updates
- Filtering and searching tasks
- Props passed between components for communication
- Cute, anime-inspired UI with stickers, pastel colors, and rounded cards
- Responsive design for desktop and mobile

---

## What I Learned

- How to efficiently render dynamic lists in React
- Proper use of unique keys for list items
- Conditional rendering for multiple UI states
- Structuring reusable and type-safe components in React + TypeScript
- Passing data and events between components
- Applying CSS for cute and functional UI design

---

# **Project Plan – Task Management Dashboard**

The goal of this project is to build a React and TypeScript Task Management Dashboard where users can view, add, edit, and delete tasks, as well as filter them by status and priority. To start, I will set up the project using Vite and install any necessary dependencies like Tailwind for styling and Heroicons for UI elements. The project will be organized with separate folders for components (`TaskList`, `TaskItem`, `TaskFilter`, and `Dashboard`), TypeScript interfaces, and utility functions for filtering, sorting, and validation. I will define interfaces for tasks and component props to enforce type safety. Components will be built progressively: `TaskItem` will display individual task details with visual indicators for status and priority, `TaskList` will render all tasks using `.map()` with proper keys and handle deletions, `TaskFilter` will manage filtering options and communicate with the dashboard, and `Dashboard` will combine everything, manage state with `useState`, and display statistics. For styling, I will use pastel colors, rounded cards, cute fonts, and stickers to create an anime-inspired UI. Tasks will be stored in localStorage to persist data between sessions. Finally, I will test the application by adding, editing, deleting, and filtering tasks while ensuring responsiveness and usability on desktop and mobile. This approach ensures the project is structured, type-safe, visually appealing, and fully functional.
