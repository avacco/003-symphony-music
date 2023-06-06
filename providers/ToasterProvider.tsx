"use client";

import { Toaster } from "react-hot-toast";

/* Toaster, o los mensajitos que salen arriba en una pagina para señalar un error o una accion exitosa */
const ToasterProvider = () => {
  return (
    <Toaster 
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        }
      }}
    
    />
  )
}

export default ToasterProvider;