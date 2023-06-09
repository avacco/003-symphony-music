'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';

interface LibraryProps {
  songs: Song[];
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
 
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onClick = () => {
    if(!user) return authModal.onOpen(); // Abre modal de autenticacion para usuarios no logeados
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
              onClick={() => {}}
              data={item} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}
