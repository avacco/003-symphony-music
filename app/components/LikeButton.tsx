"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

/**
 * Componente de boton de favoritos. Recibe songId desde el componente padre SearchContent, y lo utiliza para asociar la cancion favorita al usuario activo 
 * @param songId - ID de la cancion a marcar como favorita.
 */
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal(); // Trae modal de autenticación para casos en que el usuario actual no este logeado
  const { user } = useUser(); // Trae al usuario actual y sus datos

  const [isLiked, setIsLiked] = useState(false);

  // Trae de las canciones favoritas del usuario la cual tenga los mismos IDs que los recibidos.
  useEffect(() => {
    if(!user?.id) return; // Ignora todas las instrucciones si el usuario no esta logeado

    const fetchData = async () => {
      const { 
        data, 
        error 
      } = await supabaseClient.from("liked_songs")
                              .select("*")
                              .eq("user_id", user.id)
                              .eq("song_id", songId)
                              .single();

      if(!error && data) setIsLiked(true)
    }

    fetchData();

  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart; // El tipo de icono dependera de si se ha marcado la canción como favorita o no.
  
  // Control de favoritos.
    // Abre modal de autenticación si el usuario no esta logeado
    // Si la cancion ya esta marcada como favorita, la desmarca y la elimina de la base de datos.
    // Si la cancion no esta marcada como favorita, la marca como favorita y la agrega a la base de datos.
    // Envia toast con error, si los hay, o con mensaje de exito si no.
  const handleLike = async () => {

    if(!user) return authModal.onOpen(); 
   
    if(isLiked) {
      const { error } = await supabaseClient.from("liked_songs")
                              .delete()
                              .eq("user_id", user.id)
                              .eq("song_id", songId);

      if(error) toast.error(error.message); else setIsLiked(false);

    } else {
      const { error } = await supabaseClient.from("liked_songs")
                              .insert({
                                song_id: songId,
                                user_id: user.id
                              });

      if(error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Añadido a favoritos");
      }
    } 
    router.refresh();
  } 
  
  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  )
}

export default LikeButton