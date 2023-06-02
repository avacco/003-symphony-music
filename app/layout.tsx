import SupabaseProvider from '@/providers/SupabaseProvider'
import { Sidebar } from './components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import UserProvider from '@/providers/UserProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Symphony Music',
  description: 'Comparte y escucha musica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider> {/* Proveedor para funciones de Supabase */}
          <UserProvider> {/* Proveedor que se encarga de manejar los datos y estado de usuario */}
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>   
      </body>
    </html>
  )
}
