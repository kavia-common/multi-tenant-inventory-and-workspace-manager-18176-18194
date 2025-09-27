import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import { AppProviders } from './providers/AppProviders';
import AppLayout from './layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ItemsPage from './pages/items/ItemsPage';
import ItemDetailPage from './pages/items/ItemDetailPage';
import ListsPage from './pages/lists/ListsPage';
import ListDetailPage from './pages/lists/ListDetailPage';
import LendingPage from './pages/lending/LendingPage';
import ActivityPage from './pages/activity/ActivityPage';
import RecycleBinPage from './pages/recycle/RecycleBinPage';
import ShareViewPage from './pages/share/ShareViewPage';
import SettingsPage from './pages/settings/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './routing/PrivateRoute';
import PublicRoute from './routing/PublicRoute';

// PUBLIC_INTERFACE
export default function App() {
  /** Root app sets up providers and router */
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/share/:listId" element={<ShareViewPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/items/:itemId" element={<ItemDetailPage />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/lists/:listId" element={<ListDetailPage />} />
              <Route path="/lending" element={<LendingPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/recycle" element={<RecycleBinPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
