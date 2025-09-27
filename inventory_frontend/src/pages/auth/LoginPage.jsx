import { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login with email/password, mock accepts any credentials */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav(from, { replace: true });
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ width: 'min(440px, 96vw)' }}>
        <div className="page-header">
          <div className="page-title">Welcome back</div>
        </div>
        <form onSubmit={onSubmit} className="grid">
          <div className="col-12">
            <label>Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="col-12">
            <label>Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div className="col-12" style={{ display:'flex', gap:8, justifyContent:'space-between', alignItems:'center' }}>
            <button className="btn primary" type="submit">Login</button>
            <Link to="/signup" className="btn">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
