import { useState } from 'react';
import { useWorkspace } from '../../state/WorkspaceContext';

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Workspace management: add workspaces */
  const { workspaces, addWorkspace } = useWorkspace();
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addWorkspace(name.trim());
    setName('');
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">Settings</div>
      </div>
      <div className="col-6 card">
        <div className="page-title" style={{ fontSize: 16, marginBottom: 8 }}>Workspaces</div>
        <ul>
          {workspaces.map(w => <li key={w.id} style={{ padding:'6px 0', borderBottom:'1px solid var(--border)' }}>{w.name}</li>)}
        </ul>
        <form onSubmit={submit} style={{ display:'flex', gap:8, marginTop:12 }}>
          <input className="input" placeholder="New workspace name" value={name} onChange={e=>setName(e.target.value)} />
          <button className="btn primary" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
