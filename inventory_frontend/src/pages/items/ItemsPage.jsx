import { useMemo, useState } from 'react';
import { useData } from '../../state/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi';

// PUBLIC_INTERFACE
export default function ItemsPage() {
  /** Manage items with create/update/delete and search */
  const { wsData, createItem, deleteItem } = useData();
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', quantity: 1 });
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return wsData.items;
    return wsData.items.filter(i => [i.name, i.description, i.location].filter(Boolean).join(' ').toLowerCase().includes(q));
  }, [wsData.items, query]);

  const submit = (e) => {
    e.preventDefault();
    const it = createItem(form);
    setShowAdd(false);
    setForm({ name: '', location: '', quantity: 1 });
    navigate(`/items/${it.id}`);
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">Items</div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <div className="input" style={{ display:'flex', alignItems:'center', gap:8, width:280 }}>
            <FiSearch />
            <input placeholder="Search items..." style={{ border:'none', outline:'none', flex:1, background:'transparent' }} value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
          <button className="btn primary" onClick={() => setShowAdd(true)}><FiPlus /> Add</button>
        </div>
      </div>

      {filtered.map(i => (
        <div className="col-3" key={i.id}>
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <Link to={`/items/${i.id}`} className="page-title" style={{ fontSize:16, textDecoration:'none' }}>{i.name}</Link>
              <button className="btn ghost" title="Delete" onClick={() => deleteItem(i.id)}><FiTrash2 /></button>
            </div>
            <div className="kv" style={{ marginTop:8 }}>
              <div className="muted">Location</div><div>{i.location || '-'}</div>
              <div className="muted">Qty</div><div>{i.quantity ?? 1}</div>
            </div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && <div className="col-12 card">No items. Click Add to create your first item.</div>}

      {showAdd && (
        <div className="modal-backdrop" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="page-header"><div className="page-title">Add item</div></div>
            <form onSubmit={submit} className="grid">
              <div className="col-12"><label>Name</label><input className="input" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
              <div className="col-6"><label>Location</label><input className="input" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} /></div>
              <div className="col-6"><label>Quantity</label><input className="input" type="number" min="0" value={form.quantity} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} /></div>
              <div className="col-12" style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                <button type="button" className="btn" onClick={()=>setShowAdd(false)}>Cancel</button>
                <button className="btn primary" type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
