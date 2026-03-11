import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client authenticated with the current Auth0 access token.
 * Always create fresh — never store the client globally.
 *
 * Server Component / Route Handler:
 *   import { auth0 } from '@/lib/auth0'
 *   const session = await auth0.getSession()
 *   const supabase = createSupabaseClient(session?.tokenSet.accessToken)
 *
 * Client Component (via API route that proxies the token):
 *   const { data } = await fetch('/api/token').then(r => r.json())
 *   const supabase = createSupabaseClient(data.accessToken)
 */
export const createSupabaseClient = (token?: string) =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    token
      ? {
          global: {
            headers: { Authorization: `Bearer ${token}` },
          },
        }
      : undefined
  )
