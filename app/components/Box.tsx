'use client';

import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}
/* Componente que se encarga de crear un contenedor de caja para la barra de navegacion lateral */
const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (          // Junta los classname nativos con los traidos por props  
    <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}> 
      {children}
    </div>
  )
}

export default Box;