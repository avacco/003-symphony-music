import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Hook para el control de modal de subir archivos
 * @property isOpen boolean, normalmente falso.
 * @function onOpen setea isOpen a true.
 * @function onClose setea isOpen a false.
 */
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useUploadModal;
