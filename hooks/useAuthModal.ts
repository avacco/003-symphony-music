import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/* Hook para el control de modals */
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAuthModal;