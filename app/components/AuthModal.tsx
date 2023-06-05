"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal";

/* Componente de modal para autenticacion. Utiliza el componente Modal de base. */
const AuthModal = () => {

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal(); // Importa las funciones de apertura y cierre de modal

  const onChange = (open: boolean) => {
    if (!open) onClose();
  }

  return (
    <Modal 
      title="Bienvenido de vuelta"
      description="Ingresa tus credenciales para continuar"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth 
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#444",
                brandAccent: "black"
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default AuthModal;