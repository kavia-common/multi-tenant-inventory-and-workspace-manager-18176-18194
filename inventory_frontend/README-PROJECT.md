# Inventory Frontend (React PWA)

Modern, responsive PWA implementing multi-tenant inventory management with "Ocean Professional" theme.

Features
- Authentication (mocked)
- Workspace management and switching
- Items and Lists CRUD
- Lending workflow with camera scan prompt (mock)
- List share (view-only public page)
- Notifications (in-app, mocked)
- Activity log
- Recycle bin (restore/purge)
- PWA offline caching and installability

Tech
- React 18 + React Router v6
- LocalStorage-backed mock data and contexts
- Lightweight service worker and manifest
- No heavy UI libs; clean CSS with tokens

Scripts
- npm start
- npm run build
- npm test

Env
- No required env vars. If integrating real APIs, add variables to .env and update data layer accordingly.

Structure
- src/
  - layout/ AppLayout.jsx
  - pages/ auth, dashboard, items, lists, lending, activity, recycle, share, settings
  - routing/ PrivateRoute.jsx, PublicRoute.jsx
  - state/ AuthContext.jsx, WorkspaceContext.jsx, DataContext.jsx, NotificationContext.jsx
  - styles/ theme.css, layout.css, components.css
  - utils/ scanner.js
