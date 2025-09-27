import { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SignupPage() {
  /** Signup with email/password, mock accepts any credentials */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    nav('/dashboard', { replace: true });
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ width: 'min(440px, 96vw)' }}>
        <div className="page-header">
          <div className="page-title">Create your account</div>
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
            <button className="btn primary" type="submit">Sign up</button>
            <Link to="/login" className="btn">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
