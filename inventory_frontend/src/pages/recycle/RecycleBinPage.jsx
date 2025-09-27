import { useData } from '../../state/DataContext';

// PUBLIC_INTERFACE
export default function RecycleBinPage() {
  /** Restore and purge recycled records */
  const { wsData, restoreFromRecycle, purgeRecycle } = useData();

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">Recycle Bin</div>
      </div>
      <div className="col-12 card">
        <table className="table">
          <thead><tr><th>When</th><th>Type</th><th>Name/ID</th><th>Actions</th></tr></thead>
          <tbody>
            {wsData.recycle.map(r => (
              <tr key={r.id}>
                <td>{new Date(r.deletedAt).toLocaleString()}</td>
                <td>{r.kind}</td>
                <td>{r.payload?.name || r.payload?.id || '-'}</td>
                <td>
                  <div style={{ display:'flex', gap:8 }}>
                    <button className="btn" onClick={()=>restoreFromRecycle(r.id)}>Restore</button>
                    <button className="btn secondary" onClick={()=>purgeRecycle(r.id)}>Purge</button>
                  </div>
                </td>
              </tr>
            ))}
            {wsData.recycle.length===0 && <tr><td colSpan={4}>Recycle bin is empty.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
