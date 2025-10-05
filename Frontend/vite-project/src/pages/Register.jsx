import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(name,email,password);
    nav('/login');
  }

  return (
    <form onSubmit={submit} className="card p-4 mx-auto" style={{maxWidth:'400px'}}>
      <h2 className="mb-3">Register</h2>
      <div className="mb-3">
        <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"  />
      </div>
      <div className="mb-3">
        <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      </div>
      <div className="mb-3">
        <input className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      </div>
      <button className="btn btn-primary w-100">Register</button>
    </form>
  )
}
