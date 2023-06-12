import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
};
/* Hook que maneja el estado del reproductor
 * @param ids: string[] - Lista de ids de canciones
 * @param activeId: string - Id de la canción activa
 * @param setId: (id: string) => void - Función que setea el id de la canción activa
 * @param setIds: (ids: string[]) => void - Función que setea la lista de ids de canciones
 * @param reset: () => void - Función que resetea el estado del reproductor
*/
const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined })
})); 

export default usePlayer;
