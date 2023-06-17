"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import SongButton from "./SongButton";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
  onDelete: (song: Song) => void;
}
/* Componente de canción individual. Recibe como "data" los datos de la canción individual traida desde su componente padre (PageContent) */
const SongItem: React.FC<SongItemProps> = ({ song, onClick, onDelete }) => {
  
  const { user } = useUser();

  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const imagePath = useLoadImage(song); // Envia los datos de la canción al hook, y retorna la url de la imagen de la misma.

  const prepareDelete = () => {
    if(confirmDelete) setConfirmDelete(false); else setConfirmDelete(true);
  }

  
  return (
    <>
      {confirmDelete ? (
        <div className="relative group flex flex-col itms-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutrall-400/10 transition p-3">
          <h1 className=" text-red-500 font-semibold text-center">Por favor, confirma que vas a eliminar esta canción</h1>
          <div className="pt-5 justify-center items-center flex gap-5">
            {user && user.id === song.user_id && ( // Solo muestra boton de eliminar al usuario cuyo id sea igual al id del usuario que subio la cancion.            
              <div onClick={() => onDelete(song)}>
                <SongButton variant="delete" className="bg-red-600" />
              </div>
            )}
            <div onClick={() => prepareDelete()}>
              <SongButton variant="cancel" className="bg-cyan-600" />
            </div>
          </div>
        </div>
      ) : (
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
              {song.title}
            </p>
            <p className="text-neeutral-400 text-sm pb-4 w-full truncate">
              Por {song.author}
            </p>
          </div>
          <div onClick={() => onClick(song.id)} className="absolute bottom-24 right-5">
            <SongButton variant="play" className="bg-cyan-600" />
          </div>
          {user && user.id === song.user_id && (
            <div onClick={() => prepareDelete()} className="absolute top-3 left-3">
              <SongButton variant="delete" className="bg-red-600" />
            </div>
          )}  
        </div>
      )}
    </>
  )
}

export default SongItem