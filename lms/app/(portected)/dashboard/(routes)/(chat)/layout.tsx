import AuthContext from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'
import ActiveStatus from '@/components/ActiveStatus'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
 
export const metadata = {
  title: 'Messenger',
  description: 'Messenger ',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session} >
           <ToasterContext />
          <ActiveStatus />
          {children}
    </SessionProvider>
  )
}
