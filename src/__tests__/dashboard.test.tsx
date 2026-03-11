/**
 * Example test — Dashboard page component.
 *
 * Shows the core pattern:
 * - Mock Auth0 session
 * - Mock Supabase client (prevents env var validation before MSW can intercept)
 * - Assert rendered output
 *
 * Add per-project tests following this pattern.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock Auth0 server-side session
vi.mock('@/lib/auth0', () => ({
  auth0: {
    getSession: vi.fn().mockResolvedValue({
      user: { name: 'Test User', email: 'test@example.com', sub: 'auth0|123' },
      tokenSet: { accessToken: 'mock-access-token' },
    }),
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// Mock Supabase client factory.
// Supabase validates env vars in createClient() before any HTTP call,
// so we stub the whole factory and control return data per-test.
const mockSelect = vi.fn()
vi.mock('@/lib/supabase', () => ({
  createSupabaseClient: () => ({
    from: () => ({
      select: () => ({
        order: mockSelect,
      }),
    }),
  }),
}))

// Lazy import after mocks are set up
const getDashboard = () => import('../../app/dashboard/page')

describe('Dashboard', () => {
  it('renders user email when authenticated', async () => {
    mockSelect.mockResolvedValue({ data: [{ id: 1, name: 'Test Item' }], error: null })

    const { default: Dashboard } = await getDashboard()
    const jsx = await Dashboard()
    render(jsx)

    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('shows empty state when no items', async () => {
    mockSelect.mockResolvedValue({ data: [], error: null })

    const { default: Dashboard } = await getDashboard()
    const jsx = await Dashboard()
    render(jsx)

    expect(screen.getByText('No items yet.')).toBeInTheDocument()
  })
})
