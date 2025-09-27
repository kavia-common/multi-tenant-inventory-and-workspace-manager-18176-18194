import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useWorkspace } from './WorkspaceContext';
import { useNotifications } from './NotificationContext';
import { v4 as uuid } from 'uuid';

const DataContext = createContext(null);

// seed data
const initialForWs = () => ({
  items: [],
  lists: [],
  loans: [],
  recycle: [],
  activity: []
});

// PUBLIC_INTERFACE
export function DataProvider({ children }) {
  /** Data storage per workspace with mock APIs */
  const { currentWorkspaceId } = useWorkspace();
  const { push } = useNotifications();
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('data_store');
    if (saved) setData(JSON.parse(saved));
    else setData({});
  }, []);

  useEffect(() => {
    localStorage.setItem('data_store', JSON.stringify(data));
  }, [data]);

  const wsData = useMemo(() => data[currentWorkspaceId] || initialForWs(), [data, currentWorkspaceId]);

  const saveWs = (updater) => {
    setData(prev => {
      const curr = prev[currentWorkspaceId] || initialForWs();
      const next = updater(curr);
      return { ...prev, [currentWorkspaceId]: next };
    });
  };

  // Activity helper
  const log = (type, message, meta) => {
    saveWs(ws => ({ ...ws, activity: [{ id: uuid(), type, message, meta, at: new Date().toISOString() }, ...ws.activity] }));
  };

  // Items
  const createItem = (item) => {
    const it = { id: uuid(), ...item, createdAt: new Date().toISOString() };
    saveWs(ws => ({ ...ws, items: [it, ...ws.items] }));
    log('item:create', `Created item "${item.name}"`, { id: it.id });
    push(`Item created: ${item.name}`);
    return it;
  };

  const updateItem = (id, patch) => {
    saveWs(ws => ({ ...ws, items: ws.items.map(i => i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i) }));
    log('item:update', `Updated item`, { id });
  };

  const deleteItem = (id) => {
    saveWs(ws => {
      const item = ws.items.find(i => i.id === id);
      return { ...ws, items: ws.items.filter(i => i.id !== id), recycle: [{ id: uuid(), kind: 'item', payload: item, deletedAt: new Date().toISOString() }, ...ws.recycle] };
    });
    log('item:delete', `Deleted item`, { id });
    push('Item moved to recycle bin');
  };

  // Lists
  const createList = (list) => {
    const l = { id: uuid(), name: list.name, itemIds: list.itemIds || [], sharedViewOnly: list.sharedViewOnly || false, createdAt: new Date().toISOString() };
    saveWs(ws => ({ ...ws, lists: [l, ...ws.lists] }));
    log('list:create', `Created list "${l.name}"`, { id: l.id });
    return l;
  };

  const updateList = (id, patch) => {
    saveWs(ws => ({ ...ws, lists: ws.lists.map(l => l.id === id ? { ...l, ...patch } : l) }));
    log('list:update', `Updated list`, { id });
  };

  const deleteList = (id) => {
    saveWs(ws => {
      const list = ws.lists.find(l => l.id === id);
      return { ...ws, lists: ws.lists.filter(l => l.id !== id), recycle: [{ id: uuid(), kind: 'list', payload: list, deletedAt: new Date().toISOString() }, ...ws.recycle] };
    });
    log('list:delete', `Deleted list`, { id });
  };

  // Lending (loan records)
  const createLoan = (loan) => {
    const ln = { id: uuid(), status: 'out', ...loan, createdAt: new Date().toISOString() };
    saveWs(ws => ({ ...ws, loans: [ln, ...ws.loans] }));
    log('loan:create', `Loan created`, { id: ln.id });
    push('Item marked as lent out');
  };

  const returnLoan = (id) => {
    saveWs(ws => ({ ...ws, loans: ws.loans.map(l => l.id === id ? { ...l, status: 'returned', returnedAt: new Date().toISOString() } : l) }));
    log('loan:return', `Loan returned`, { id });
  };

  // Recycle
  const restoreFromRecycle = (rid) => {
    saveWs(ws => {
      const rec = ws.recycle.find(r => r.id === rid);
      const rest = ws.recycle.filter(r => r.id !== rid);
      if (!rec) return ws;
      if (rec.kind === 'item') return { ...ws, recycle: rest, items: [rec.payload, ...ws.items] };
      if (rec.kind === 'list') return { ...ws, recycle: rest, lists: [rec.payload, ...ws.lists] };
      return ws;
    });
    log('recycle:restore', `Restored item from recycle`, { id: rid });
  };

  const purgeRecycle = (rid) => {
    saveWs(ws => ({ ...ws, recycle: ws.recycle.filter(r => r.id !== rid) }));
    log('recycle:purge', `Permanently removed`, { id: rid });
  };

  return (
    <DataContext.Provider value={{
      wsData,
      createItem, updateItem, deleteItem,
      createList, updateList, deleteList,
      createLoan, returnLoan,
      restoreFromRecycle, purgeRecycle
    }}>
      {children}
    </DataContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useData() { return useContext(DataContext); }
