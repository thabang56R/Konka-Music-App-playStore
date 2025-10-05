import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'

export default function Player(){
  const { audioRef, current, playing, pause } = useContext(PlayerContext);
  const [pos, setPos] = useState(0);

  useEffect(()=>{
    const audio = audioRef.current;
    const onTime = ()=> setPos(audio.currentTime);
    audio.addEventListener('timeupdate', onTime);
    return ()=> audio.removeEventListener('timeupdate', onTime);
  }, []);

  if(!current) return null;

  return (
    <div className="bg-dark text-white p-3 d-flex align-items-center justify-content-between fixed-bottom">
      <div className="d-flex align-items-center gap-2">
        <img src={current.coverUrl ? current.coverUrl : '/placeholder.png'} alt="cover" style={{width:'50px', height:'50px', objectFit:'cover'}} />
        <div>
          <div>{current.title}</div>
          <div className="text-muted">{current.artist}</div>
        </div>
      </div>
      <div>
        {playing && <button className="btn btn-light btn-sm" onClick={pause}>Pause</button>}
        <span className="ms-2">{Math.floor(pos)}s</span>
      </div>
    </div>
  )
}
