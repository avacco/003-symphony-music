"use client";

import LikeButton from "@/app/components/LikeButton";
import MediaItem from "@/app/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  songs: Song[];
} 

/**
 * Componente que muestra las canciones que el usuario ha agregado a favoritos 
 * @param songs Lista de canciones agregadas a favoritos.
 */
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  
  const router = useRouter();
  
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();

  useEffect(() => {

    if(!isLoading && !user) router.replace("/"); // Redirecciona a la raiz si no hay usuario logeado.
  
  }, [isLoading, user, router])
  
  if(songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No hay canciones en favoritos.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem 
              onClick={(id: string) => onPlay(id)}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent