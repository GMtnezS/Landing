import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Giselle Martinez-Sanchez',
  description: 'Full-Stack Engineer building at the intersection of technology and human wellbeing.',
  icons: {
    icon: '/contained_water_.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
