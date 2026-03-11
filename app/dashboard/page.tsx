import { auth0 } from '@/lib/auth0'
import { createSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

/**
 * Example protected Server Component.
 *
 * Pattern for every data-fetching page:
 * 1. Get session — redirect if unauthenticated
 * 2. Create a fresh Supabase client with the access token
 * 3. Query — RLS ensures users only see their own rows
 *
 * Replace `test_table` with your actual table name.
 */
export default async function Dashboard() {
  const session = await auth0.getSession()
  if (!session) redirect('/auth/login')

  const supabase = createSupabaseClient(session.tokenSet.accessToken)

  const { data: items, error } = await supabase
    .from('test_table')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error.message)
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{session.user.email}</span>
          <a
            href="/auth/logout"
            className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Log out
          </a>
        </div>
      </div>

      {/* Replace with your actual UI */}
      {error && (
        <p className="text-red-500">Failed to load data: {error.message}</p>
      )}
      {items && items.length === 0 && (
        <p className="text-gray-500">No items yet.</p>
      )}
      {items && items.length > 0 && (
        <pre className="rounded bg-gray-50 p-4 text-sm">
          {JSON.stringify(items, null, 2)}
        </pre>
      )}
    </main>
  )
}
