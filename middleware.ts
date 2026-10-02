import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Triple W Boutique — admin gate (directive §7)
 *
 * Copy into the frontend repo as `middleware.ts` (project root, next to
 * app/). Two jobs:
 *   1. Refresh the Supabase session cookie on every request (the standard
 *      @supabase/ssr pattern — required or sessions silently expire).
 *   2. Redirect unauthenticated /admin requests to /admin/login instead of
 *      rendering and failing silently.
 *
 * This is UX routing only. The real authorization boundary is RLS + the
 * admin allowlist; a stale or forged cookie gets past this gate but gains
 * nothing (reads are public, writes are blocked server-side by policies).
 *
 * If you want the gate itself to be strict about "the one admin" (not just
 * "any logged-in user"), add an admin check against the session claims
 * here as well — RLS stays the backstop either way.
 */

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    // Fail closed: without Supabase config we cannot validate a session.
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'server-misconfigured');
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // IMPORTANT: do not remove. getUser() revalidates the JWT against the auth
  // server; getSession() alone trusts the cookie and can be spoofed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (isAdminPath && !user && !isLoginPage) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Optional nicety: already logged in → skip the login page.
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
