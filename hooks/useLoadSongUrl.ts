import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * Hook que trae la url de la cancion en la base de datos.
 * @param song Cancion a la cual se le quiere sacar la url.
 */
const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient(); // Intercambiable por useSessionContext(); extrayendo {supabaseClient} para casos donde se necesite autenticación

  if(!song) return "";

  const { data: songData } = supabaseClient.storage.from("songs").getPublicUrl(song.song_path);

  return songData.publicUrl;
                                                   
}

export default useLoadSongUrl;