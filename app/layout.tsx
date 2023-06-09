import SupabaseProvider from '@/providers/SupabaseProvider'
import { Sidebar } from './components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Symphony Music',
  description: 'Comparte y escucha musica',
}

export const revalidate = 0; // Evita cacheo de la pagina 

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider /> {/* Proveedor para los mensajes de alerta, o "toasters" */}
        <SupabaseProvider> {/* Proveedor para funciones de Supabase */}
          <UserProvider> {/* Proveedor que se encarga de manejar los datos y estado de usuario */}
            <ModalProvider /> {/* Proveedor que se encarga de manejar los modals  */}
            <Sidebar songs={userSongs}> {/* Componente que se encarga de mostrar el menu lateral */}
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>   
      </body>
    </html>
  )
}
