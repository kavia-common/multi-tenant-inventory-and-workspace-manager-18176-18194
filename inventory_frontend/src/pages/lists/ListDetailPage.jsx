import { useParams } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export default function ListDetailPage() {
  /** Edit list membership */
  const { listId } = useParams();
  const { wsData, updateList } = useData();
  const list = useMemo(() => wsData.lists.find(l => l.id === listId), [wsData.lists, listId]);
  const [search, setSearch] = useState('');

  if (!list) return <div className="card">List not found.</div>;

  const items = wsData.items.filter(i => [i.name, i.location, i.description].join(' ').toLowerCase().includes(search.toLowerCase().trim()));
  const inList = new Set(list.itemIds);

  const toggle = (id) => {
    const next = new Set(list.itemIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    updateList(list.id, { itemIds: Array.from(next) });
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">{list.name}</div>
        <input className="input" style={{ width: 320 }} placeholder="Search items to add..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="col-12 card">
        <table className="table">
          <thead><tr><th>In list</th><th>Name</th><th>Location</th><th>Qty</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} onClick={()=>toggle(i.id)} style={{ cursor:'pointer' }}>
                <td>{inList.has(i.id) ? '✓' : ''}</td>
                <td>{i.name}</td>
                <td>{i.location || '-'}</td>
                <td>{i.quantity ?? 1}</td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4}>No items match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
