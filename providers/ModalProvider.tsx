"use client";

import AuthModal from "@/app/components/AuthModal";
import SubscribeModal from "@/app/components/SubscribeModal";
import UploadModal from "@/app/components/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface ModalProviderProps {
  products: ProductWithPrice[]
}

/**
 * Proveedor de los distintos modals a usar en la aplicación
 */
const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;
  
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  )
};

export default ModalProvider;