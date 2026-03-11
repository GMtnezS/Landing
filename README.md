# GMtnezS Starter Template

> Auth0 + Supabase + Vercel + Next.js 15 + TDD baseline.
> Fork this repo for every new project. Never set this up from scratch again.

---

## Table of Contents

1. [What's Included](#1-whats-included)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Installation](#4-installation)
5. [Auth (Auth0)](#5-auth-auth0)
6. [Database (Supabase)](#6-database-supabase)
7. [Image Uploads (Cloudinary)](#7-image-uploads-cloudinary)
8. [TDD Setup](#8-tdd-setup)
9. [Environment Variables](#9-environment-variables)
10. [Deployment (Vercel)](#10-deployment-vercel)
11. [Forking Checklist](#11-forking-checklist)

---

## 1. What's Included

- Next.js 15 App Router scaffold (React 19)
- Auth0 login/logout wired and working (`@auth0/nextjs-auth0` v4)
- Supabase client configured to accept Auth0 JWTs
- Row-Level Security policy pattern (users only see their own data)
- Cloudinary unsigned upload utility
- Vitest + React Testing Library + MSW configured and running
- Vercel deployment ready

What is NOT included:

- Any domain-specific data models (add per project)
- Any UI components beyond a basic Auth0 login gate (add per project)
- Drag and drop, rich text editors, or other feature-specific libraries (add per project)

---

## 2. Tech Stack

| Layer         | Tool                             | Notes                                        |
| ------------- | -------------------------------- | -------------------------------------------- |
| Frontend      | Next.js 15 App Router            | React 19, SSR/SSG, file-based routing        |
| Styling       | Tailwind CSS                     | Utility-first                                |
| Auth          | Auth0 (`@auth0/nextjs-auth0` v4) | Middleware-based, server + client support    |
| Database      | Supabase (PostgreSQL)            | RLS, real-time, free tier                    |
| Image storage | Cloudinary                       | Optional — remove if project doesn't need it |
| Deployment    | Vercel                           | Free tier, GitHub integration                |
| Testing       | Vitest + React Testing Library   | Fast, Vite-powered                           |
| API mocking   | MSW (Mock Service Worker)        | Mock Supabase calls without hitting DB       |

---

## 3. Folder Structure

```
project-name/
├── app/
│   ├── globals.css
│   ├── layout.tsx                  ← Root layout
│   └── page.tsx                    ← Auth gate (server component)
├── components/                     ← Add per project
├── hooks/
│   └── useAuth.ts                  ← Client-side auth hook (useUser wrapper)
├── lib/
│   ├── auth0.ts                    ← Auth0Client instance (import everywhere)
│   ├── supabase.ts                 ← Supabase client factory
│   └── cloudinary.ts               ← Cloudinary upload utility (optional)
├── src/
│   ├── mocks/
│   │   ├── handlers.js             ← MSW route handlers (add per project)
│   │   └── server.js               ← MSW server setup
│   └── setupTests.js
├── public/
├── middleware.ts                   ← Auth0 middleware (handles all /auth/* routes)
├── .env.example                    ← Commit this (empty values)
├── .env.local                      ← Never commit this
├── next.config.ts
├── vitest.config.ts
└── tailwind.config.js
```

---

## 4. Installation

```bash
# Clone template
git clone https://github.com/GiselleMtnezS/starter-template your-project-name
cd your-project-name
npm install

# Copy env file
cp .env.example .env.local
# Fill in .env.local values (see Section 9)

npm run dev
```

---

## 5. Auth (Auth0)

### Auth0 Dashboard Setup

1. Create new Application → **Regular Web Application** (not SPA)
2. Add to **Allowed Callback URLs:** `http://localhost:3000/auth/callback, https://your-vercel-url.vercel.app/auth/callback`
3. Add to **Allowed Logout URLs:** `http://localhost:3000, https://your-vercel-url.vercel.app`
4. (Optional) Create an **API** in Auth0 → note the Audience identifier

> **v4 change:** Callback URL is now `/auth/callback` (not `/api/auth/callback`).

### How it works (v4)

Auth0 v4 uses **middleware** instead of a route handler. `middleware.ts` intercepts all requests and Auth0 automatically handles:

- `/auth/login` — redirects to Auth0
- `/auth/logout` — logs out and redirects
- `/auth/callback` — handles the redirect back from Auth0

No route files needed.

### Server Components — `auth0.getSession()`

```tsx
import { auth0 } from '@/lib/auth0'

export default async function MyPage() {
  const session = await auth0.getSession()
  const user = session?.user
  // user is null if not logged in
}
```

### Client Components — `useAuth` hook

```tsx
'use client'
import { useAuth } from '@/hooks/useAuth'

export default function MyComponent() {
  const { user, isLoading, login, logout } = useAuth()
}
```

### Protecting routes

```tsx
// app/dashboard/page.tsx
import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth0.getSession()
  if (!session) redirect('/auth/login')
  // ...
}
```

---

## 6. Database (Supabase)

### Supabase + Auth0 JWT Integration

In Supabase dashboard → Settings → Auth → JWT Settings:

- Use Auth0 JWKS endpoint: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`

### Server Component / Route Handler

```ts
import { auth0 } from '@/lib/auth0'
import { createSupabaseClient } from '@/lib/supabase'

const session = await auth0.getSession()
const supabase = createSupabaseClient(session?.tokenSet.accessToken)
```

### RLS Policy Pattern

```sql
ALTER TABLE test_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own records"
  ON test_table FOR SELECT
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users insert own records"
  ON test_table FOR INSERT
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users update own records"
  ON test_table FOR UPDATE
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users delete own records"
  ON test_table FOR DELETE
  USING (user_id = auth.uid()::text);
```

> `user_id` column should be `TEXT` storing the Auth0 `sub` (e.g. `auth0|abc123`).

---

## 7. Image Uploads (Cloudinary)

> Remove `lib/cloudinary.ts` and the env vars if the project doesn't need image uploads.

```ts
import { uploadImage } from '@/lib/cloudinary'

const url = await uploadImage(file) // Returns secure_url — store in Supabase
```

---

## 8. TDD Setup

### Verify setup works

```bash
npm test
# Should show 0 tests, 0 failures
```

### Writing tests

```tsx
// components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

test('renders correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('...')).toBeInTheDocument()
})
```

### Mocking next/navigation

```ts
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  redirect: vi.fn(),
}))
```

### Mocking Auth0

```ts
vi.mock('@auth0/nextjs-auth0', () => ({
  useUser: () => ({ user: { name: 'Test User', sub: 'auth0|123' }, isLoading: false }),
}))
```

### Adding MSW handlers

```js
// src/mocks/handlers.js
export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/test_table`, () => {
    return HttpResponse.json([{ id: 1, name: 'Test' }])
  }),
]
```

---

## 9. Environment Variables

### .env.example (commit this)

```
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_SECRET=
APP_BASE_URL=
AUTH0_AUDIENCE=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### .env.local (never commit)

```
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=run-openssl-rand-hex-32        # exactly 64 hex chars
APP_BASE_URL=http://localhost:3000
AUTH0_AUDIENCE=https://your-api-identifier  # optional

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset
```

> `AUTH0_SECRET` and `AUTH0_CLIENT_SECRET` are server-only — no `NEXT_PUBLIC_` prefix.
> `APP_BASE_URL` replaces the old `AUTH0_BASE_URL` from v3.

---

## 10. Deployment (Vercel)

1. Push repo to GitHub
2. Go to vercel.com → New Project → Import repo
3. Vercel auto-detects Next.js — no build config needed
4. Add all `.env.local` variables to Vercel → Settings → Environment Variables
5. Set `APP_BASE_URL` to your production Vercel URL
6. Add Vercel URLs to Auth0 Allowed Callback/Logout URLs (use `/auth/callback` and `/auth/logout`)
7. Add Vercel URLs to Supabase allowed origins (Settings → API)

---

## 11. Forking Checklist

- [ ] Clone repo, rename, push to new GitHub repo
- [ ] `npm install`
- [ ] Create new Auth0 Application (**Regular Web Application**)
- [ ] Create new Supabase project
- [ ] Create new Cloudinary upload preset (if needed) or remove `lib/cloudinary.ts`
- [ ] Fill in `.env.local` with new project values
- [ ] Add project-specific tables to Supabase with RLS policies
- [ ] Add project-specific MSW handlers to `src/mocks/handlers.js`
- [ ] Run `npm test` — confirm 0 failures before writing any feature code
- [ ] Connect to Vercel
- [ ] Add Vercel URLs to Auth0 and Supabase
- [ ] Delete this checklist section and update README with project-specific info
