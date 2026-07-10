# Sprint Board

A lightweight, single-page React application for tracking tasks across To Do, In Progress, and Done columns. Built for performance and simplicity using Vite, React 18 hooks, and CSS Modules.

## How to run it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the provided `localhost` URL in your browser.

> **Note:** The application will fetch 12 seed tasks from `jsonplaceholder.typicode.com` on its very first load. After that, all data (including new tasks, edits, and deletions) is strictly persisted to your browser's `localStorage` under the key `sprintboard.tasks`.

## Two or three decisions made and why

During development, several intentional decisions were made to keep the codebase tight, maintainable, and aligned with the project constraints:

1. **Native Dropdowns over Drag-and-Drop:** I opted to use a simple `<select>` dropdown to move tasks between columns instead of implementing a drag-and-drop interface. This completely eliminates the need for heavy third-party libraries (like `react-beautiful-dnd`) and drastically reduces the surface area for edge cases while keeping the app highly accessible via keyboard navigation.
2. **Derived State:** Filters (search, priority, assignee) and column task counts are entirely derived in `Board.jsx` on the fly using `useMemo`. By not storing "filtered tasks" or "column counts" in separate React state variables, we guarantee a single source of truth (`useTasks`) and completely eliminate state synchronization bugs.
3. **Native Dialogs:** For destructive actions (like deleting a task), I used a native `window.confirm()` dialog instead of building a custom modal. This keeps the component tree shallow and the scope tightly focused on core functionality.

## Anything knowingly left incomplete

To adhere to the strict time and scope constraints, a few features were knowingly left out:
* **Undo Functionality:** There is currently no way to undo a deleted task or a status change.
* **Automated Tests:** Unit and integration tests (e.g., using Jest/React Testing Library) were skipped to focus exclusively on functional UI delivery.
* **Pagination / Virtualization:** If the board grows to thousands of tasks, the single continuous column scroll will become a performance bottleneck. `react-window` or similar virtualization would be the next step.
