"use client";

import SongItem from "@/app/components/SongItem";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}
/* Componente que muestra el contenido de la pagina, especificamente las canciones. Recibe "songs", un array con los datos de las canciones sacados de la base de datos. */
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  
  if(songs.length === 0){
    return (
      <div>
        No hay canciones disponibles.
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={() => {}}
          data={item}
        />
      ))}
    </div>
  )
}

export default PageContent