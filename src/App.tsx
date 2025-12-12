// src/App.tsx

import { Dashboard } from "./components/Dashboard/Dashboard"; // keep your Dashboard
import "./index.css"; // optional here too

export default function App() {
  return (
    <div className="app-shell">
      <div className="kawaii-card">
        <header className="kawaii-header">
          <div>
            <h1 className="kawaii-title">🌸 Task Dashboard</h1>
            <div className="kawaii-sub">Vanessa's Project</div>
          </div>
          <div>
            <button className="kawaii-btn">New Task</button>
          </div>
        </header>

        <div className="kawaii-grid">
          <main>
            <div className="form-card"></div>
            {/* Your Dashboard content can go here */}
            <Dashboard />
          </main>

          <aside className="kawaii-side">
            <div>Sidebar / stats</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
