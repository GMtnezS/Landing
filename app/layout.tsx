import type { Metadata } from 'next'
import { Auth0Provider } from '@auth0/nextjs-auth0'
import './globals.css'

export const metadata: Metadata = {
  title: 'Starter Template',
  description: 'Auth0 + Supabase + Next.js starter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  )
}
