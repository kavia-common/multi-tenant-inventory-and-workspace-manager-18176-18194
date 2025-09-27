import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { useWorkspace } from '../state/WorkspaceContext';
import { useNotifications } from '../state/NotificationContext';
import { FiBox, FiList, FiHome, FiLogOut, FiClock, FiTrash, FiShare2, FiCamera, FiSettings, FiBell, FiPlus, FiGrid } from 'react-icons/fi';

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { workspaces, currentWorkspaceId, setWorkspace } = useWorkspace();
  const { notifications } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`app-shell`}>
      <header className="topnav">
        <button className="btn ghost" onClick={() => setOpen(v => !v)} aria-label="Toggle sidebar">
          <FiGrid />
        </button>
        <div className="brand">
          <span style={{ width: 10, height: 10, background: 'linear-gradient(135deg, var(--primary-500), var(--secondary))', borderRadius: 2 }} />
          Inventory
          <div className="workspace-switch">
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Workspace</span>
            <select
              aria-label="Workspace switcher"
              value={currentWorkspaceId || ''}
              onChange={(e) => setWorkspace(e.target.value)}
              className="select"
              style={{ border: 'none', background: 'transparent' }}
            >
              {workspaces.map(ws => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="nav-actions">
          <button className="btn ghost" onClick={() => navigate('/settings')} title="Settings"><FiSettings /></button>
          <button className="btn ghost" onClick={() => navigate('/activity')} title="Activity"><FiClock /></button>
          <button className="btn ghost" onClick={() => navigate('/lending')} title="Lending"><FiCamera /></button>
          <button className="btn ghost" onClick={() => navigate('/recycle')} title="Recycle Bin"><FiTrash /></button>
          <button className="btn ghost" onClick={() => navigate('/lists')} title="Lists"><FiList /></button>
          <button className="btn ghost" onClick={() => navigate('/items')} title="Items"><FiBox /></button>
          <button className="btn ghost" onClick={() => navigate('/dashboard')} title="Dashboard"><FiHome /></button>
          <button className="btn ghost" title={`${notifications.length} notifications`} onClick={() => navigate('/activity')}>
            <FiBell />
          </button>
          <div className="badge">{user?.email || 'user'}</div>
          <button className="btn secondary" onClick={handleLogout}><FiLogOut /> <span className="nav-label">Logout</span></button>
        </div>
      </header>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="nav-section">Overview</div>
        <NavLink to="/dashboard" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiHome /> <span className="nav-label">Dashboard</span></NavLink>

        <div className="nav-section">Inventory</div>
        <NavLink to="/items" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiBox /> <span className="nav-label">Items</span></NavLink>
        <NavLink to="/lists" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiList /> <span className="nav-label">Lists</span></NavLink>

        <div className="nav-section">Workflows</div>
        <NavLink to="/lending" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiCamera /> <span className="nav-label">Lending</span></NavLink>
        <NavLink to="/activity" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiClock /> <span className="nav-label">Activity</span></NavLink>
        <NavLink to="/recycle" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiTrash /> <span className="nav-label">Recycle Bin</span></NavLink>
        <NavLink to="/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiSettings /> <span className="nav-label">Settings</span></NavLink>

        <div className="nav-section">Share</div>
        <NavLink to="/lists" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FiShare2 /> <span className="nav-label">Share Lists</span></NavLink>
      </aside>

      <main className="content">
        <Outlet />
      </main>

      <button className="fab" onClick={() => navigate('/items')}>
        <FiPlus size={22} />
      </button>
    </div>
  );
}
