import { useData } from '../../state/DataContext';
import { useNotifications } from '../../state/NotificationContext';

// PUBLIC_INTERFACE
export default function ActivityPage() {
  /** Activity feed and notifications management */
  const { wsData } = useData();
  const { notifications, clear } = useNotifications();

  return (
    <div className="grid">
      <div className="col-6 card">
        <div className="page-title" style={{ marginBottom: 8 }}>Activity log</div>
        <table className="table">
          <thead><tr><th>When</th><th>Message</th><th>Type</th></tr></thead>
          <tbody>
            {wsData.activity.map(a => (
              <tr key={a.id}>
                <td>{new Date(a.at).toLocaleString()}</td>
                <td>{a.message}</td>
                <td className="badge">{a.type}</td>
              </tr>
            ))}
            {wsData.activity.length===0 && <tr><td colSpan={3}>No activity yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="col-6 card">
        <div className="page-title" style={{ marginBottom: 8 }}>Notifications</div>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8 }}>
          <div className="badge">{notifications.length} notifications</div>
          <button className="btn" onClick={clear}>Clear</button>
        </div>
        <ul>
          {notifications.map(n => (
            <li key={n.id} style={{ padding: '8px 0', borderBottom:'1px solid var(--border)' }}>
              <div>{n.msg}</div>
              <div className="badge">{new Date(n.date).toLocaleString()}</div>
            </li>
          ))}
          {notifications.length===0 && <li>No notifications.</li>}
        </ul>
      </div>
    </div>
  );
}
