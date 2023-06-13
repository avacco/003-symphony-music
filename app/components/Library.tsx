'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import useSubscribeModal from '@/hooks/useSubscribeModal';

interface LibraryProps {
  songs: Song[];
}

/**
 * Componente de libreria que muestra las canciones que el usuario ha subido
 * @param songs Lista de canciones
 */
export const Library: React.FC<LibraryProps> = ({ songs }) => {
 
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if(!user) return authModal.onOpen(); // Abre modal de autenticacion para usuarios no logeados
    if(!subscription) return subscribeModal.onOpen(); // Abre el modal de suscripcion para usuarios no suscritos.

    return uploadModal.onOpen(); // Abre modal de subida de canciones para usuarios logeados
    
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className='text-neutral-400'/>
          <p className='text-neutral-400 font-medium text-md'>Tu Libreria</p>
        </div>
        <AiOutlinePlus 
          size={20}
          onClick={onClick}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
      </div>
      <div className='flex flex-col  gap-y-2 mt-4 px-3'>
        {songs.map((item) => (
          <div>
            <MediaItem 
              key={item.id}
              onClick={(id: string) => onPlay(id)}
              data={item} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}
