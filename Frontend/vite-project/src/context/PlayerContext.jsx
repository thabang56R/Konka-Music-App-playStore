import React, { createContext, useState, useRef } from 'react'
export const PlayerContext = createContext();

export function PlayerProvider({ children }){
  const audioRef = useRef(new Audio());
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);

  const playSong = (song) => {
    if(current?.audioUrl !== song.audioUrl){
      audioRef.current.src = song.audioUrl;
      setCurrent(song);
    }
    audioRef.current.play();
    setPlaying(true);
  }
  const pause = ()=>{ audioRef.current.pause(); setPlaying(false); }

  return (
    <PlayerContext.Provider value={{ audioRef, current, playing, playSong, pause }}>
      {children}
    </PlayerContext.Provider>
  )
}

