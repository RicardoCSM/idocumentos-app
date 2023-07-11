import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'
import InfoModal from './components/modals/InfoModal'

export const metadata: Metadata = {
  title: 'iDocumentos',
  description: 'Notifique sobre um documento incorreto!',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <InfoModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        <div className=''>
          {children}
        </div>
      </body>
    </html>
  )
}
