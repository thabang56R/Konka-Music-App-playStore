import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import { PlayerContext } from '../context/PlayerContext'

export default function Home(){
  const [songs, setSongs] = useState([]);
  const [q, setQ] = useState('');
  const { playSong } = useContext(PlayerContext);

  useEffect(()=>{ load(); }, []);
  async function load(qStr=''){
    const res = await api.get(`/songs?q=${encodeURIComponent(qStr)}`);
    const list = res.data.map(s => ({ ...s, audioUrl: `http://localhost:5000${s.audioUrl}` }));
    setSongs(list);
  }

  return (
    <div>
      {/* Carousel Section */}
      <div id="mainCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner rounded shadow">
          <div className="carousel-item active">
            <img src="/skull.jpg" className="d-block w-100 carousel-img" alt="Kwaito" />
            <div className="carousel-caption d-none d-md-block">
              <h1 className='text-success'>Discover New Music</h1>
              <h1 className='text-success'>Stream and enjoy unlimited songs anytime.</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/chill-house.jfif" className="d-block w-100 carousel-img" alt="chill-House" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Create Your Playlist</h5>
              <p>Organize your favorite tracks easily.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/amapiano2.jfif" className="d-block w-100 carousel-img" alt="Amapiano" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Enjoy Anywhere</h5>
              <p>Listen on all your devices seamlessly.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search + Song Grid */}
      <h1 className="mb-3">Browse Songs</h1>
      <div className="input-group mb-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="form-control" />
        <button className="btn btn-primary" onClick={()=>load(q)}>Search</button>
      </div>
      <div className="row">
        {songs.map(s=>(
          <div key={s._id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={s.coverUrl ? `http://localhost:5000${s.coverUrl}` : '/placeholder.png'} className="card-img-top" alt="cover" />
              <div className="mt-auto">
                <h5 className="card-title">{s.title}</h5>
                <p className="card-text">{s.artist}</p>
                <button className="btn btn-success w-100" onClick={()=>playSong(s)}>▶ Play</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
