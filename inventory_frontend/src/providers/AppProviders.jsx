import { AuthProvider } from '../state/AuthContext';
import { WorkspaceProvider } from '../state/WorkspaceContext';
import { DataProvider } from '../state/DataContext';
import { NotificationProvider } from '../state/NotificationContext';

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /** Wraps the app with global providers for auth, workspace, data and notifications */
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <DataProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </DataProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
