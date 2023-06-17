import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useUser } from "./useUser"

/**
 * Hook para eliminar una canción por su id
 * @param song La canciona eliminar
 */
const useOnDelete = () => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const { user } = useUser();

    const deleteSong = async (song: Song) => {

      if(!user) return toast.error("Debes iniciar sesión para poder eliminar una canción.");

      const { error } = await supabaseClient.from("songs").delete().eq("id", song.id);    
                          
      if(error){
        return toast.error(error.message);
      } 
      toast.success("Canción eliminada correctamente.");
      router.refresh();
    }

  return deleteSong;
}

export default useOnDelete;