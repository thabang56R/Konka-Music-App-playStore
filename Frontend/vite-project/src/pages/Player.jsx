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
    <div className="player">
      <img src={current.coverUrl ? current.coverUrl.replace('http://localhost:5000','http://localhost:5000') : '/placeholder.png'} alt="cover" />
      <div>
        <div>{current.title}</div>
        <div>{current.artist}</div>
      </div>
      <div>
        {playing ? <button onClick={pause}>Pause</button> : null}
        <div>{Math.floor(pos)}</div>
      </div>
    </div>
  )
}

