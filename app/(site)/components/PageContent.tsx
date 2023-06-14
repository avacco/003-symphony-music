"use client";

import SongItem from "@/app/components/SongItem";
import useOnDelete from "@/hooks/useOnDelete";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}
/** 
 * Componente que muestra el contenido de la pagina, especificamente las canciones. Recibe "songs", un array con los datos de las canciones sacados de la base de datos. 
 * @param songs Array de canciones. Traido como prop desde la homepage.  
*/
const PageContent: React.FC<PageContentProps> = ({ songs }) => {

  const onPlay = useOnPlay(songs);
  const onDelete = useOnDelete();
  
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
          onClick={(id: string) => onPlay(id)}
          onDelete={(id: string) => onDelete(id)}
          data={item}
        />
      ))}
    </div>
  )
}

export default PageContent