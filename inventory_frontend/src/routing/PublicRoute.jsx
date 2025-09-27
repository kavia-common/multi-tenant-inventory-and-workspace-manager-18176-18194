import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

// PUBLIC_INTERFACE
export default function PublicRoute() {
  /** Redirect to dashboard if already logged in */
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
