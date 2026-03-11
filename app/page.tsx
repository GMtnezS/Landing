import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'

/**
 * Root page — redirects based on auth state.
 * Replace this with your actual landing/marketing page if needed.
 */
export default async function Home() {
  const session = await auth0.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <a
        href="/auth/login"
        className="rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Log in
      </a>
    </main>
  )
}
