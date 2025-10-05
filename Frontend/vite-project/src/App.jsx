import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Player from './components/Player'
import Footer from './components/Footer'


import { AuthProvider } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'


export default function App(){
return (
<AuthProvider>
<PlayerProvider>
<div className="d-flex flex-column min-vh-100">
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container-fluid">
<Link className="navbar-brand" to="/">Konka 🎵AppStore</Link>
<div className="collapse navbar-collapse">
<ul className="navbar-nav ms-auto">
<li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
<li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
<li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
</ul>
</div>
</div>
</nav>
<main className="flex-fill container py-3">
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
<Route path="/upload" element={<Upload/>} />
</Routes>
</main>
<Footer />
<Player />
</div>
</PlayerProvider>
</AuthProvider>
)
}