import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Triple W Boutique — Supabase clients (directive §6/§7)
 *
 * Two flavors, matching the standard @supabase/ssr Next.js App Router pattern:
 *
 *   browserClient()  — "use client" components (anon key; RLS enforced)
 *   await serverClient() — server components / route handlers / server actions
 *                          (anon key + cookie forwarding; RLS enforced, session
 *                          resolves to the admin after login)
 *   serviceClient()  — server-only privileged work that must bypass RLS
 *                      (SERVICE_ROLE key; never import from client code)
 *
 * All reads run through RLS as anon/authenticated — the service client exists
 * only for privileged server-side operations that genuinely need it.
 */
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}. Copy .env.example to .env.local and fill it in.`);
  }
  return value;
}

/** Client-safe anon client. Safe to use from browser or server; RLS applies. */
export function browserClient(): SupabaseClient {
  return createClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'), {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

/** Per-request server client bound to the Next.js cookie store (App Router). */
export async function serverClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a server component render pass — safe to ignore; the
          // middleware (lib/middleware.ts) refreshes sessions there instead.
        }
      },
    },
  });
}

/** Service-role client. SERVER ONLY — bypasses RLS. Never ship to the browser. */
export function serviceClient(): SupabaseClient {
  return createClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
