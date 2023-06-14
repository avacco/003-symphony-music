import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"
import { useUser } from "./useUser"

/**
 * Hook para eliminar una canción por su id
 * @param id El id de la canción
 */
const useOnDelete = () => {
  const { supabaseClient } = useSessionContext();

    const deleteSong = async (id: string) => {

      const { error } = await supabaseClient.from("songs").delete().eq("id", id);                         
                          
      if(error){
        return toast.error(error.message);
      } 
      toast.success("Canción eliminada correctamente. ID: "+ id);
    }

  return deleteSong;
}

export default useOnDelete;