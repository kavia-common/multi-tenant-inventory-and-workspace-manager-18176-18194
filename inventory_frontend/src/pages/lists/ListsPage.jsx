import { useData } from '../../state/DataContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiPlus, FiShare2 } from 'react-icons/fi';

// PUBLIC_INTERFACE
export default function ListsPage() {
  /** Manage lists and view-only share state */
  const { wsData, createList, updateList } = useData();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');

  const create = (e) => {
    e.preventDefault();
    const l = createList({ name, itemIds: [] });
    setShowAdd(false);
    setName('');
    window.location.assign(`/lists/${l.id}`);
  };

  const toggleShare = (list) => {
    updateList(list.id, { sharedViewOnly: !list.sharedViewOnly });
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">Lists</div>
        <button className="btn primary" onClick={() => setShowAdd(true)}><FiPlus /> New list</button>
      </div>

      {wsData.lists.map(l => (
        <div className="col-3" key={l.id}>
          <div className="card">
            <div className="page-title" style={{ fontSize:16 }}>{l.name}</div>
            <div className="badge" style={{ marginTop:8 }}>{l.itemIds.length} items</div>
            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <Link className="btn" to={`/lists/${l.id}`}>Open</Link>
              <button className="btn" onClick={() => toggleShare(l)}><FiShare2 /> {l.sharedViewOnly ? 'Shared' : 'Share'}</button>
              {l.sharedViewOnly && <a className="btn secondary" href={`/share/${l.id}`} target="_blank" rel="noreferrer">View-only link</a>}
            </div>
          </div>
        </div>
      ))}
      {wsData.lists.length === 0 && <div className="col-12 card">No lists created.</div>}

      {showAdd && (
        <div className="modal-backdrop" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="page-header"><div className="page-title">New list</div></div>
            <form onSubmit={create} className="grid">
              <div className="col-12"><label>Name</label><input className="input" required value={name} onChange={e=>setName(e.target.value)} /></div>
              <div className="col-12" style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                <button className="btn" type="button" onClick={()=>setShowAdd(false)}>Cancel</button>
                <button className="btn primary" type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
