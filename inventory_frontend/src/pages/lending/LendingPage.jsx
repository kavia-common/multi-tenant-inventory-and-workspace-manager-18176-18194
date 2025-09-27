import { useData } from '../../state/DataContext';
import { useState } from 'react';
import { openScanPrompt } from '../../utils/scanner';
import { FiCamera, FiCheck } from 'react-icons/fi';

// PUBLIC_INTERFACE
export default function LendingPage() {
  /** Create a loan by selecting an item via scan or dropdown; return loans */
  const { wsData, createLoan, returnLoan } = useData();
  const [selectedItemId, setSelectedItemId] = useState('');
  const [borrower, setBorrower] = useState('');

  const scan = async () => {
    const code = await openScanPrompt();
    if (!code) return;
    const item = wsData.items.find(i => i.id === code || i.name.toLowerCase() === code.toLowerCase());
    if (item) setSelectedItemId(item.id);
    else alert('No item matched that code. You can select manually.');
  };

  const create = (e) => {
    e.preventDefault();
    if (!selectedItemId || !borrower) return;
    createLoan({ itemId: selectedItemId, borrower, dueAt: null });
    setSelectedItemId('');
    setBorrower('');
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <div className="page-title">Lending</div>
        <button className="btn" onClick={scan}><FiCamera /> Scan</button>
      </div>

      <div className="col-12 card">
        <form onSubmit={create} className="grid">
          <div className="col-6">
            <label>Item</label>
            <select className="input" value={selectedItemId} onChange={e=>setSelectedItemId(e.target.value)}>
              <option value="">Select item...</option>
              {wsData.items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          <div className="col-6">
            <label>Borrower</label>
            <input className="input" value={borrower} onChange={e=>setBorrower(e.target.value)} placeholder="Person/Department" />
          </div>
          <div className="col-12">
            <button className="btn primary" type="submit">Create loan</button>
          </div>
        </form>
      </div>

      <div className="col-12 card">
        <div className="page-title" style={{ fontSize:16, marginBottom:12 }}>Active loans</div>
        <table className="table">
          <thead><tr><th>Item</th><th>Borrower</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {wsData.loans.filter(l=>l.status==='out').map(l => {
              const item = wsData.items.find(i=>i.id===l.itemId);
              return (
                <tr key={l.id}>
                  <td>{item?.name || l.itemId}</td>
                  <td>{l.borrower}</td>
                  <td><span className="badge">Out</span></td>
                  <td><button className="btn" onClick={()=>returnLoan(l.id)}><FiCheck /> Return</button></td>
                </tr>
              );
            })}
            {wsData.loans.filter(l=>l.status==='out').length===0 && <tr><td colSpan={4}>No active loans.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
