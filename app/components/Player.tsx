"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

/**
 * Componente de reproductor para las canciones.
 */
const Player = () => {

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if(!song || !songUrl || !player.activeId) return null;


  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent 
        key={songUrl} // Workaround para resetear el hook "useSound" (este no acepta valores dinamicos) cuando se cambia de una cancion a otra. Con key, el componente entero es destruido y recreado cuando se cambia de cancion.
        song={song} 
        songUrl={songUrl} 
      />
    </div>
  )
}

export default Player