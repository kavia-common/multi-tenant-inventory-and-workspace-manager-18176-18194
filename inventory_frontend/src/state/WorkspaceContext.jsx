import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WorkspaceContext = createContext(null);
const DEFAULTS = [
  { id: 'ws-home', name: 'Home' },
  { id: 'ws-basement', name: 'Basement' },
  { id: 'ws-office', name: 'Office' },
  { id: 'ws-vacation', name: 'Εξοχικό' }
];

// PUBLIC_INTERFACE
export function WorkspaceProvider({ children }) {
  /** Manage tenant workspaces and current selection */
  const [workspaces, setWorkspaces] = useState(DEFAULTS);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(DEFAULTS[0].id);

  useEffect(() => {
    const saved = localStorage.getItem('ws_state');
    if (saved) {
      const p = JSON.parse(saved);
      setWorkspaces(p.workspaces || DEFAULTS);
      setCurrentWorkspaceId(p.currentWorkspaceId || DEFAULTS[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ws_state', JSON.stringify({ workspaces, currentWorkspaceId }));
  }, [workspaces, currentWorkspaceId]);

  const currentWorkspace = useMemo(
    () => workspaces.find(w => w.id === currentWorkspaceId),
    [workspaces, currentWorkspaceId]
  );

  const addWorkspace = (name) => {
    const id = `ws-${Date.now()}`;
    setWorkspaces(prev => [...prev, { id, name }]);
    setCurrentWorkspaceId(id);
  };

  const setWorkspace = (id) => setCurrentWorkspaceId(id);

  return (
    <WorkspaceContext.Provider value={{ workspaces, currentWorkspace, currentWorkspaceId, addWorkspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useWorkspace() { return useContext(WorkspaceContext); }
