import { useWorkspace } from '../../state/WorkspaceContext';
import { useData } from '../../state/DataContext';
import { Link } from 'react-router-dom';
import { FiBox, FiList, FiCamera, FiClock } from 'react-icons/fi';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Overview cards and recent activity */
  const { currentWorkspace } = useWorkspace();
  const { wsData } = useData();

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="badge">Workspace: {currentWorkspace?.name}</div>
        </div>
        <div className="top-actions">
          <Link to="/items" className="btn primary"><FiBox /> Items</Link>
          <Link to="/lists" className="btn"><FiList /> Lists</Link>
          <Link to="/lending" className="btn"><FiCamera /> Lending</Link>
          <Link to="/activity" className="btn"><FiClock /> Activity</Link>
        </div>
      </div>

      <div className="col-3 card">
        <div className="badge"><FiBox /> Items</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{wsData.items.length}</div>
      </div>
      <div className="col-3 card">
        <div className="badge"><FiList /> Lists</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{wsData.lists.length}</div>
      </div>
      <div className="col-3 card">
        <div className="badge"><FiCamera /> Loans Out</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{wsData.loans.filter(l => l.status === 'out').length}</div>
      </div>
      <div className="col-3 card">
        <div className="badge"><FiClock /> Activity</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{wsData.activity.length}</div>
      </div>

      <div className="col-12 card">
        <div className="page-header">
          <div className="page-title">Recent activity</div>
        </div>
        <table className="table">
          <thead><tr><th>When</th><th>Event</th><th>Type</th></tr></thead>
          <tbody>
            {wsData.activity.slice(0, 10).map(a => (
              <tr key={a.id}>
                <td>{new Date(a.at).toLocaleString()}</td>
                <td>{a.message}</td>
                <td className="badge">{a.type}</td>
              </tr>
            ))}
            {wsData.activity.length === 0 && <tr><td colSpan={3}>No activity yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
