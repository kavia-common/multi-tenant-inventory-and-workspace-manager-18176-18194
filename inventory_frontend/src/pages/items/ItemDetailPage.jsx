import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useMemo, useState } from 'react';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import QRCode from 'qrcode';

// PUBLIC_INTERFACE
export default function ItemDetailPage() {
  /** View and edit item details, with QR code export */
  const { itemId } = useParams();
  const { wsData, updateItem } = useData();
  const navigate = useNavigate();

  const item = useMemo(() => wsData.items.find(i => i.id === itemId), [wsData.items, itemId]);
  const [form, setForm] = useState(() => item || {});

  if (!item) return <div className="card">Item not found.</div>;

  const save = (e) => {
    e.preventDefault();
    updateItem(itemId, form);
    navigate('/items');
  };

  const downloadQR = async () => {
    const url = `${window.location.origin}/share/${itemId}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `item-${itemId}.png`;
    a.click();
  };

  return (
    <div className="grid">
      <div className="col-12 page-header">
        <button className="btn" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
        <div className="page-title">{item.name}</div>
        <div className="top-actions">
          <button className="btn" onClick={downloadQR}>Export QR</button>
          <button className="btn primary" onClick={save}><FiSave /> Save</button>
        </div>
      </div>
      <div className="col-8 card">
        <form onSubmit={save} className="grid">
          <div className="col-12"><label>Name</label><input className="input" value={form.name||''} onChange={e=>setForm({...form, name:e.target.value})} /></div>
          <div className="col-6"><label>Location</label><input className="input" value={form.location||''} onChange={e=>setForm({...form, location:e.target.value})} /></div>
          <div className="col-6"><label>Quantity</label><input className="input" type="number" value={form.quantity||0} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} /></div>
          <div className="col-12"><label>Description</label><textarea className="input" rows={4} value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})} /></div>
        </form>
      </div>
      <div className="col-4 card">
        <div className="badge">Metadata</div>
        <div className="kv" style={{ marginTop:8 }}>
          <div>ID</div><div>{item.id}</div>
          <div>Created</div><div>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}</div>
          <div>Updated</div><div>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}</div>
        </div>
      </div>
    </div>
  );
}
