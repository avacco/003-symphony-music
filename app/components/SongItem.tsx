"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import DeleteButton from "./DeleteButton";
import { useUser } from "@/hooks/useUser";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}
/* Componente de canción individual. Recibe como "data" los datos de la canción individual traida desde su componente padre (PageContent) */
const SongItem: React.FC<SongItemProps> = ({ data, onClick, onDelete }) => {
  
  const { user } = useUser();

  const imagePath = useLoadImage(data); // Envia los datos de la canción al hook, y retorna la url de la imagen de la misma.
  
  return (
    <div className="relative group flex flex-col itms-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutrall-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image 
          className="object-cover"
          src={imagePath || "/images/placeholder.png"}
          fill
          alt="canción"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {data.title}
        </p>
        <p className="text-neeutral-400 text-sm pb-4 w-full truncate">
          Por {data.author}
        </p>
      </div>
      <div onClick={() => onClick(data.id)} className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
      {user && user.id === data.user_id && ( // Solo muestra boton de eliminar al usuario cuyo id sea igual al id del usuario que subio la cancion.
        <div onClick={() => onDelete(data.id)} className="absolute top-3 left-3">
          <DeleteButton />
        </div>
      )}
      
    </div>
  )
}

export default SongItem