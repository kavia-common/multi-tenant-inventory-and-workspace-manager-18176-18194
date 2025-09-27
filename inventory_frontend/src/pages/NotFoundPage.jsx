import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 fallback */
  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'100vh' }}>
      <div className="card" style={{ padding: 24 }}>
        <div className="page-title">Page not found</div>
        <div style={{ marginTop: 8 }}>
          <Link to="/dashboard" className="btn">Go home</Link>
        </div>
      </div>
    </div>
  );
}
