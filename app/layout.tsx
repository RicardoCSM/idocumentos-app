import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

export const metadata: Metadata = {
  title: 'iDocumentos',
  description: 'Notifique sobre um documento incorreto!',
}

const font = Nunito({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}
