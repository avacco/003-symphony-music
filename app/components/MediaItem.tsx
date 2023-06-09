"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

/* Componente que muestra una canción de la libreria del usuario. Recibe los datos de la cancion, y una funcion onClick como parametros, de parte del componente padre (Library) */
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  
  const imageUrl = useLoadImage(data); // Envia los datos de la cancion al hook y recibe la url de la imagen.
  
  const handleClick = () => {
    if(onClick) return onClick(data.id);
  }

  return (
    <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/placeholder.png"}
          alt="Canción de libreria"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">
            {data.title}
          </p>
          <p className="text-neutral-400 text-sm truncate">
            {data.author}
          </p>
      </div>
    </div>
  )
}

export default MediaItem