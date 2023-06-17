import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useUser } from "./useUser"

/**
 * Hook para eliminar una canción por su id
 */
const useOnDelete = () => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const { user } = useUser();

    const deleteSong = async (song: Song) => {

      // Si de alguna manera se saltan la verificación anterior, se hace un ultimo chequeo a la hora de ejecutar la eliminación.
      if(!user) return toast.error("Debes iniciar sesión para poder eliminar una canción.");
      if(user.id !== song.user_id) return toast.error("No puedes eliminar esta canción.");

      const { error } = await supabaseClient.from("songs").delete().eq("id", song.id);    
                          
      if(error)return toast.error(error.message);
      deleteSongFromStorage(song);
    }

    const deleteSongFromStorage = async (song: Song) => {
      const { 
        error 
      } = await supabaseClient.storage
                              .from('songs')
                              .remove([`${song.song_path}`])
      
      if(error)return toast.error(error.message);
      deleteImageFromStorage(song);
    
    }

    const deleteImageFromStorage = async (song: Song) => {
      const { 
        error 
      } = await supabaseClient.storage
                              .from('images')
                              .remove([`${song.image_path}`])

      if(error)return toast.error(error.message); 

      toast.success("Canción eliminada correctamente.");
      router.refresh();
    }


  return deleteSong;
}

export default useOnDelete;