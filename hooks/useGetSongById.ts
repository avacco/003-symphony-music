import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"

/**
 * Hook para obtener una canción por su id
 * @param id El id de la canción
 * @returns Un objeto con la información de la canción, si se está cargando la canción, o la canción
 */
const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [song, setSong] = useState<Song | undefined>(undefined)
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if(!id) return;
    
    setIsLoading(true);

    const fetchSong = async () => {
      const {
        data,
        error
      } = await supabaseClient.from("songs")
                              .select("*")
                              .eq("id", id)
                              .single();
                          
      if(error){
        setIsLoading(false);
        return toast.error(error.message);
      } 

      setSong(data as Song);
      setIsLoading(false);
    }
    
    fetchSong();
    
  }, [id, supabaseClient]);

  return useMemo(() => ({isLoading, song}),[isLoading, song]);
}

export default useGetSongById;