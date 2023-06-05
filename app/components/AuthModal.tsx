"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

/* Componente de modal para autenticacion. Utiliza el componente Modal de base. */
const AuthModal = () => {

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal(); // Importa las funciones de apertura y cierre de modal
  
  // Si hay una sesion abierta, refresca la pagina y cierra el modal
  useEffect(() => {
    if(session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

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
          localization={{ // Para traducir los labels de la autenticacion. De momento no traduce los errores, pues no hay soporte para ello. ¿Tal vez idear un workaround?
            variables: {
              sign_in: {
                button_label: 'Ingresar',
                email_input_placeholder: 'Tu dirección de correo electrónico',
                email_label: 'Tu dirección de correo electrónico',
                password_input_placeholder: 'Tu contraseña',
                password_label: 'Tu contraseña',
                link_text: '¿Ya tienes una cuenta? Ingresa aquí',
                loading_button_label: 'Cargando...',
              },
              sign_up: {
                button_label: 'Registrarse',
                confirmation_text: 'Revisa tu correo y sigue las instrucciones para continuar.',
                email_input_placeholder: 'Ingresa tu correo electrónico',
                email_label: 'Ingresa tu correo electrónico',
                link_text: '¿No tienes cuenta? Registrate aquí',
                loading_button_label: 'Cargando...',
                password_input_placeholder: 'Ingresa tu contraseña',
                password_label: 'Ingresa tu contraseña',
              },
              forgotten_password: {
                button_label: 'Recuperar contraseña',
                confirmation_text: 'Confirma tu contraseña',
                email_input_placeholder: 'Ingresa tu correo electrónico',
                email_label: 'Ingresa tu correo electrónico',
                link_text: '¿Olvidaste tu contraseña?',
                loading_button_label: 'Cargando...',
                password_label: 'Ingresa tu contraseña',
              },
              magic_link: {
                button_label: 'Enviar enlace',
                email_input_label: 'Ingresa tu dirección de correo electrónico',
                confirmation_text: 'Confirma que tu dirección sea correcta',
                email_input_placeholder: 'Tu dirección de correo electrónico',
                link_text: 'Enviar enlace de acceso único al correo',
              },
              update_password: {
                button_label: 'Actualizar contraseña',
                confirmation_text: 'Contraseña actualizada',
                loading_button_label: 'Cargando...',
                password_input_placeholder: 'Ingresa tu contraseña',
                password_label: 'Ingresa tu contraseña',
              },
            },
          }}
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