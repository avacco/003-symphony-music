import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/* Hook que retorna la url de la imagen de la canción, traida de la base de datos. Necesita los datos de la canción para poder hacer la consulta. */
const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if(!song) return null

  const {
    data: imageData
  } = supabaseClient.storage
                    .from('images')
                    .getPublicUrl(song.image_path);
  
  return imageData.publicUrl;
}

export default useLoadImage;