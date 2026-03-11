// Baseline — extend per project with your actual Supabase table routes
import { http, HttpResponse } from 'msw'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'

export const handlers = [
  // Add per-project handlers here
  // Example:
  // http.get(`${SUPABASE_URL}/rest/v1/test_table`, () => {
  //   return HttpResponse.json([])
  // }),
]
