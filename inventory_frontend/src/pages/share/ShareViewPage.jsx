import { useParams, Link } from 'react-router-dom';
import { useData } from '../../state/DataContext';

// PUBLIC_INTERFACE
export default function ShareViewPage() {
  /** Public immutable view of a list by ID (mock: still reading from local state) */
  const { listId } = useParams();
  const { wsData } = useData();
  const list = wsData.lists.find(l => l.id === listId && l.sharedViewOnly);

  if (!list) {
    return (
      <div style={{ display:'grid', placeItems:'center', minHeight:'100vh', padding: 16 }}>
        <div className="card" style={{ width: 'min(640px, 96vw)' }}>
          <div className="page-title">List not available</div>
          <div className="badge" style={{ marginTop: 8 }}>The list is not shared or does not exist.</div>
          <div style={{ marginTop: 12 }}><Link to="/login" className="btn">Go to app</Link></div>
        </div>
      </div>
    );
  }

  const items = wsData.items.filter(i => list.itemIds.includes(i.id));

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: '0 16px' }}>
      <div className="page-header">
        <div className="page-title">{list.name}</div>
        <Link to="/login" className="btn">Open app</Link>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Location</th><th>Qty</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.location || '-'}</td>
                <td>{i.quantity ?? 1}</td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan={3}>No items in this list.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
