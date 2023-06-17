import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
};
/** Hook que maneja el estado del reproductor
 * @param ids Lista de ids de canciones
 * @param activeId Id de la canción activa
 * @param setId Función que setea el id de la canción activa
 * @param setIds Función que setea la lista de ids de canciones
 * @param reset Función que resetea el estado del reproductor
*/
const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined })
})); 

export default usePlayer;
