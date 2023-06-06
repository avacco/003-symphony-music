"use client";

import useUploadModal from "@/hooks/useUploadModal"
import { Modal } from "./Modal"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  })

  const onChange = (open: boolean) => { // open: normalmente falso
    if (!open) {
      reset(); // Limpia los campos
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try{

      setIsLoading(true);
      
      // Extrae archivos de imagen y canción de values
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      // Valida que los archivos existan, y que el usuario este logeado.
      if(!imageFile || !songFile || !user){
        toast.error("Campos faltantes o inválidos");
        return;
      }

      const uniqueId = uniqid();

      // Sube archivos a supabase
      const { 
        data: songData,
        error: songError 
      } = await supabaseClient
                            .storage.from('songs')
                            .upload(`song-${values.title}-${uniqueId}`, songFile, {cacheControl: '3600', upsert: false});
      
      if(songError) return toast.error("No se ha podido subir la canción");        
      
      const { 
        data: imageData,
        error: imageError 
      } = await supabaseClient
                            .storage.from('images')
                            .upload(`image-${values.title}-${uniqueId}`, imageFile, {cacheControl: '3600', upsert: false});
      
      if(imageError) return toast.error("No se ha podido subir la imagen");        

      const {
        error: supabaseError
      } = await supabaseClient
                            .from('songs')
                            .insert({
                              user_id: user.id,
                              title: values.title,
                              author: values.author,
                              image_path: imageData.path,
                              song_path: songData.path,
                            });
      
      if(supabaseError) {
        setIsLoading(false);
        return toast.error("No se ha podido subir la canción");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Canción creada");
      reset();
      uploadModal.onClose();

    }catch(error){
      toast.error("Error: "+error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Añade una cancion"
      description="Sube un archivo .mp3"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input 
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })} // trae props genericos que seran utiles
          placeholder="Titulo de la canción"
        />
        <Input 
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })} 
          placeholder="Autor de la canción"
        />
        <div>
          <div>
            Selecciona un archivo de canción
          </div>
          <Input 
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div>
            Selecciona una imagen para la canción
          </div>
          <Input 
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Crear
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal