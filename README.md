# TaskFlow — Responsive Kanban Task Board

A modern, responsive, SaaS-style **Kanban Task Board** application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**. Designed with a clean dashboard interface, vibrant orange accents, drag-and-drop capabilities, instant search and filtering, and full **LocalStorage** data persistence.

![TaskFlow Kanban Board](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **📊 Modern SaaS Dashboard**:
  - Clean white/light aesthetic with subtle shadows and rounded cards.
  - Accent color: Vibrant orange for primary calls-to-action.
  - Real-time project statistics bar (Total Tasks, Pending, In Progress, Completed, and Completion Velocity progress bar).

- **📋 3-Column Kanban Workflow**:
  - **Todo**: Tasks waiting to be tackled (neutral/amber status indicator).
  - **In Progress**: Tasks actively being worked on (blue status indicator).
  - **Completed**: Finished tasks (green status indicator).
  - Live column task counters and quick-add "+" buttons per column.

- **🖐️ Drag-and-Drop & Quick Move**:
  - Smooth HTML5 drag-and-drop cards between columns with visual drop target styling.
  - Quick status action menu on each card as a convenient alternative to drag-and-drop.

- **➕ Full Task CRUD**:
  - **Create Task**: Clean modal dialog with title, description, priority, due date, and status.
  - **Edit Task**: Reopens modal with pre-filled task details.
  - **Delete Task**: Custom confirmation dialog before deletion with warning banner.
  - **Form Validation**: Helpful error messages and field highlighting for required inputs.

- **🔍 Search & Multi-Criteria Filtering**:
  - Instant search across task titles and descriptions.
  - Priority filter: All, High, Medium, Low.
  - Status filter: All, Todo, In Progress, Completed.
  - Search and filters work seamlessly in combination.
  - One-click "Reset Filters" with count badges.

- **💾 LocalStorage Persistence**:
  - Automatically syncs all creations, updates, deletes, and column moves to browser `localStorage`.
  - Realistic sample tasks pre-populated on first launch.
  - Safe error handling and graceful fallbacks.
  - One-click "Reset Demo Tasks" button to restore initial sample data anytime.

- **📱 Fully Responsive Design**:
  - **Desktop**: 3-column side-by-side grid.
  - **Tablet**: Flexible multi-column layout with comfortable spacing.
  - **Mobile**: Touch-friendly controls, responsive modal, and column switcher tabs (`All`, `Todo`, `In Progress`, `Completed`).

- **🔔 User Feedback & UX States**:
  - Floating auto-dismissing toast notifications for create, update, delete, and move actions.
  - Friendly empty states for an empty board, empty column, and "No tasks found" filter results.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: Browser `localStorage` API

---

## 📁 Component Structure

```text
src/
├── components/
│   ├── ConfirmDialog.jsx      # Delete confirmation modal
│   ├── DashboardStats.jsx     # Stats cards & velocity progress bar
│   ├── EmptyState.jsx         # Friendly empty state views
│   ├── FilterDropdown.jsx     # Priority & status filter selectors
│   ├── Header.jsx             # Top bar, logo, page title, controls
│   ├── KanbanBoard.jsx        # Board container & mobile column tabs
│   ├── KanbanColumn.jsx       # Droppable column container
│   ├── SearchBar.jsx          # Search input with keyboard shortcut
│   ├── TaskCard.jsx           # Draggable task card with action menu
│   ├── TaskModal.jsx          # Add / Edit task modal with validation
│   └── Toast.jsx              # Floating toast notification alerts
├── data/
│   └── sampleTasks.js         # Initial SaaS demonstration tasks
├── hooks/
│   ├── useTasks.js            # Task CRUD, stats & localStorage hook
│   └── useToast.js            # Toast notifications hook
├── utils/
│   └── dateUtils.js           # Due date formatting & overdue detection
├── App.css                    # App utility styling
├── App.jsx                    # Root application component
├── index.css                  # Tailwind directives & base styles
└── main.jsx                   # React root entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "c:/Aarish new project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

To locally preview the production build:

```bash
npm run preview
```

---

## ☁️ Deployment (Vercel)

The project includes a pre-configured `vercel.json` file ready for seamless one-click Vercel deployment.

### Option 1: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub
1. Push this repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Add New Project**.
3. Import your GitHub repository.
4. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

---

## 📄 License

MIT License. Feel free to use and adapt this project for personal or commercial applications.
