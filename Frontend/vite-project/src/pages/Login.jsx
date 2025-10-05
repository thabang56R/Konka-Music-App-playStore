import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(email,password);
    nav('/');
  }

  return (
    <form onSubmit={submit} className="card p-4 mx-auto" style={{maxWidth:'400px'}}>
      <h2 className="mb-3">Login</h2>
      <div className="mb-3">
        <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      </div>
      <div className="mb-3">
        <input className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      </div>
      <button className="btn btn-primary w-100">Login</button>
    </form>
  )
}
