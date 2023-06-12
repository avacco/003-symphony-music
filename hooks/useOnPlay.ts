import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

/**
 * Hook que se encarga de manejar el evento de reproduccion de una cancion.
 * @param songs Lista de canciones.
 * @returns Una funcion que se ejecuta cuando se reproduce una cancion.
 * @function onPlay Recibe la id de la cancion que se desea reproducir, la manda a la lista de reproducción y la reproduce en el momento.
 */
const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    player.setId(id); // Setea la cancion actual en el reproductor (la que se acaba de clickear).
    player.setIds(songs.map((song) => song.id)); // Añade la cancion a la lista de reproduccion.
  };

  return onPlay;

}

export default useOnPlay;