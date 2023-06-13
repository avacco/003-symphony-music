import { create } from "zustand";

interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Hook para el control de modal de subscripción
 * @property isOpen boolean, normalmente falso.
 * @function onOpen setea isOpen a true.
 * @function onClose setea isOpen a false.
 */
const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSubscribeModal;
