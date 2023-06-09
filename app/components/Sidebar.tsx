'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import { SidebarItem } from './SidebarItem';
import { Library } from './Library';
import { Song } from '@/types';


interface SiderbarProps {
  songs: Song[];
  children: React.ReactNode;
}
/* Componente que muestra el menu de navegacion lateral */
export const Sidebar: React.FC<SiderbarProps> = ({ children, songs }) => {
  
  const pathname = usePathname(); 

  /* Rutas */
  const routes = useMemo(() => [ 
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search', // Se mantiene activo siempre y cuando no sea /search
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Buscar',
      active: pathname === '/search', // Se activa solo si es /search
      href: '/search'
    }
  ], [pathname]);

  return (
    <div className='flex h-full'>
      <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library songs={songs} />
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto py-2'>
        {children}
      </main>
    </div>
  )
}
