"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

/**
 * Componente que muestra el contenido de la búsqueda, o un mensaje si no encuentra nada. Recibe de props las canciones que se han encontrado. 
 * @param songs Las canciones que se han encontrado.
 */
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  
  const onPlay = useOnPlay(songs);

  if(songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No se han encontrado canciones
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent