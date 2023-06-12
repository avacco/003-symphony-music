import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Hook para el control de modal de autenticación
 * @property isOpen boolean, normalmente falso.
 * @function onOpen setea isOpen a true.
 * @function onClose setea isOpen a false.
 */
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAuthModal;
